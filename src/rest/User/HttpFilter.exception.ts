import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigAppService } from "./ConfigApp.service";
import Features from "./Features";
import { HttpExceptionFilterType, HttpExceptionType } from "./CommonTypes.types";


@Catch(HttpException)
export class HttpFilterException implements ExceptionFilter {

  constructor(private readonly configService: ConfigAppService){}

  reduceMsg(message: string | [string]): string{

    if(Array.isArray(message)){
      return message.reduce((prev, current) => Features.reduceMessage(prev,current), '');
    }

    if(message.split(';').length > 1){
      return message.split(';')[1];
    }

    return message;
  }

  setLayer(message: string): string {
    let msg: string = 'CONTROLLER';

    if(message.split(';').length > 1){
      return message.split(';')[0];
    }

    return msg;
  }


  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const responseExpress = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception.getResponse();

    /**
     * In this case, "exceptionResponse" object looks like this:
     * 
     * { 
     *    "message": "message with descriptions"
     *    "error": "error"
     *    "statusCode": 0, 
     * }
     * 
     */

    const httpException: HttpExceptionType = {
      fault: {
        statusCode: exceptionResponse.statusCode,
        error: exceptionResponse.error,
        message: this.reduceMsg(exceptionResponse.message),
        date: Features.getTimeZone(new Date()),
        layer: this.setLayer(String(exceptionResponse.message)),
        transactionId: this.configService.getTransactionId(),
        urlApi: this.configService.getUrlApi(),
        urlBackend: this.configService.getUrlBackend(), 
      }
    }

    responseExpress
      .status(exceptionResponse.statusCode)
      .json(httpException);
  }

}