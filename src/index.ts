import * as request from 'request-promise';

const API_URL = 'https://api.46elks.com';

namespace FortySixElks {
  export interface Options {
    username: string;
    password: string;
    debug?: boolean;
  }

  export namespace SMS {
    export type DeliveryStatus = 'created' | 'sent' | 'failed' | 'delivered';

    export interface SendPayload {
      from: string;
      to: string;
      message: string;
      dryrun?: 'yes';
      whendelivered?: string;
      flashsms?: 'yes';
      dontlog?: 'message';
    }

    export interface SendResponse {
      id: string;
      status: DeliveryStatus;
      from: string;
      to: string;
      created: string;
      delivered: string | undefined;
      cost: number;
      direction: 'outgoing';
      dontlog: 'message';
      estimated_cost?: number;
      parts: number;
    }
  }
}


export class FortySixElksClient {

  private options: FortySixElks.Options;

  constructor(options: FortySixElks.Options) {
    this.options = options;
  }

  async sendSMS(payload: FortySixElks.SMS.SendPayload): Promise<FortySixElks.SMS.SendResponse> {
    const payloadClone = {...payload};
    if (this.options.debug) payloadClone.dryrun = 'yes';
    return request.post({
      url: `${API_URL}/a1/SMS`,
      body: payloadClone,
      auth: {
        username: this.options.username,
        password: this.options.password,
      },
      json: true,
    });
  }

}
