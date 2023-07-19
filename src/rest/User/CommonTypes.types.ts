//
export type HttpExceptionFilterType = {
    message: string | [string];
    error: string;
    statusCode: number;
  }
  
  //
  export type HttpExceptionType = {
    fault: {
      statusCode: number;
      error: string;
      message: string;
      date: string;
      layer: string;
      transactionId?: string;
      urlApi?: string;
      urlBackend?: string;
    }
  }