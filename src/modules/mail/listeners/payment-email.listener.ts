import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PaymentEmailListener {
  private readonly logger = new Logger(PaymentEmailListener.name);

  constructor(private readonly mailService: MailerService) {}

  @OnEvent('SEND_MAILER', { async: true })
  async handlePaymentEmailEvent({ email, person, token }) {
    try {
      this.logger.log('send email...');

      await this.mailService.sendMail({
        to: email,
        subject: 'Welcome to Ecommerce!',
        template: './verify-payment',
        context: {
          name: person.fullName,
          token: token,
        },
      });

      this.logger.log('email sent');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
