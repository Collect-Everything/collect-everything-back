export interface IServiceConfig {
  name: string;
  port: number;
  host: string;
  protocol: string;
}

export class ServiceConfig implements IServiceConfig {
  name: string;
  port: number;
  host: string;
  protocol: string;

  constructor(config: IServiceConfig) {
    this.name = config.name;
    this.port = config.port;
    this.host = config.host;
    this.protocol = config.protocol;
  }

  get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  }
}
