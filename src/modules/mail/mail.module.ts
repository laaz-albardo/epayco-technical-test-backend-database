import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { PaymentEmailListener } from './listeners';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import HandlebarsHelper from 'handlebars-helpers';
import { ISmtp } from '@src/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): MailerOptions => {
        const {
          host,
          port,
          username,
          password,
          secureSsl,
          senderEmailDefault,
        } = config.get<ISmtp>('smtp');

        return {
          transport: {
            host: host,
            port: port,
            secure: secureSsl === 'true',
            auth: {
              user: username,
              pass: password,
            },
          },
          defaults: {
            from: `"No Reply" <${senderEmailDefault}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
              helpers: HandlebarsHelper(),
            },
          },
        };
      },
    }),
  ],
  providers: [PaymentEmailListener],
})
export class MailModule {}
