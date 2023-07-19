import { UserType } from "./User.type";
import { users } from "./FakeDataUsers";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigAppService {

  private data: UserType[];
  private length: number;
  private transactionid: string;
  private verb: string;
  private urlApi: string;
  private urlBackend: string;

  constructor(private readonly configService: ConfigService) {
    this.data = users;
    this.length = users.length;
    this.transactionid = '';
    this.urlBackend = this.configService.get<string>('NODE_ENV_URL_BACK_END');

  }

  getLenth = (): number => this.length;
  getData = (): UserType[] => this.data;
  setData = (users: UserType[]) => this.data = users;

  setTransactionId = (transactionid : string) => this.transactionid = transactionid;
  getTransactionId = (): string => this.transactionid;

  setVerb = (verb: string) => this.verb = verb;
  getVerb = (): string => this.verb;

  getUrlApi = (): string => this.urlApi;
  setUrlApi = (urlApi: string) => this.urlApi = urlApi;

  /**
   * 
   * @description
   * Enviroment variables of the application
   * 
   */

  getUrlBackend = (): string => this.urlBackend;
}