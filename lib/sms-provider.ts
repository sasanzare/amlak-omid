
// Create an instance of KavenegarApi with your API key

import { KavenegarApi } from 'kavenegar';
import { env } from 'process';
export class SmsProvider {
    private apiKey: string = String(env.SMS_API_KEY)
    private defaultSenderPhoneNumber: string = String(env.SMS_DEFAULT_NUMBER)
    private api
    constructor() {
        this.api = KavenegarApi({
            apikey: this.apiKey,
        });
    }
    public async sendMessage(message: string, receptor: string) {
        this.api.Send({
            receptor, message, sender: this.defaultSenderPhoneNumber
        }, function (response, status) {
            console.log(response);
            console.log(status);
        });
    }
}