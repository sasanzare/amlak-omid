import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from 'process';
export class SmsProvider {
    apiKey: string = String(env.SMS_API_KEY)
    defaultSenderPhoneNumber: string = String(env.SMS_DEFAULT_NUMBER)
    baseUrl: string = "https://api2.ippanel.com/api/v1";
    axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": this.apiKey,
            },
        });
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

    }
    public async request(config: AxiosRequestConfig) {
        return this.axiosInstance.request(config)
    }
    public async sendMessage(message: string, recipients: string[]) {
        const response = await this.request({
            url: `/sms/send/webservice/single`,
            method: "POST",
            data: {
                "sender": this.defaultSenderPhoneNumber,
                "recipient": recipients,
                "message": message,
            },
        });
        return response;
    }
}