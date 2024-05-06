import { Twilio } from "twilio";

class SMSService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendSMS(to: string, body: string): Promise<void> {
    try {
      await this.client.messages.create({
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: body,
      });
    } catch (error) {
      console.error("Failed to send SMS:", error);
      throw error;
    }
  }
}

export default SMSService;
