import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { IServer } from '@src/config';

@Injectable()
export class PaymentEmailListener {
  private readonly logger = new Logger(PaymentEmailListener.name);

  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent('SEND_MAILER', { async: true })
  async handlePaymentEmailEvent({ email, person, sesionId, token }) {
    try {
      this.logger.log('send email...');

      const { host, port } = this.configService.get<IServer>('server');

      await this.mailService.sendMail({
        to: email,
        subject: 'Welcome to Ecommerce!',
        template: './verify-payment',
        context: {
          name: person.fullName,
          sesionId: sesionId,
          token: token,
          host: host,
          port: port,
        },
      });

      this.logger.log('email sent');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
