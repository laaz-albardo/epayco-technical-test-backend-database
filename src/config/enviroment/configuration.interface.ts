export interface IServer {
  name: string;
  environment: string;
  host: string;
  port: number;
}

export interface IDatabase {
  host: string;
  port: number;
  url: string;
  database: string;
  username: string;
  password: string;
}

export interface IJwt {
  secret: string;
  expiresIn: number;
}

export interface ISmtp {
  host: string;
  port: number;
  username: string;
  password: string;
  secureSsl: boolean;
  senderName: string;
  senderEmailDefault: string;
}

export interface IConfiguration {
  server: IServer;
  db: IDatabase;
  jwt: IJwt;
  smtp: ISmtp;
}
