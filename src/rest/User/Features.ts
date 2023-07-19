import { HttpExceptionFilterType, HttpExceptionType } from "./CommonTypes.types";
import { UserType } from "./User.type";

//
type EntryType = [string, any];

function getById(dataIn: UserType[], id: number): UserType[] {
  return dataIn.filter(user => user.id === id);
}

function filterByOneParam(userEntry: EntryType, dataIn: UserType[]): UserType[]{
  return dataIn.filter(user => user[userEntry[0]] === Number(userEntry[1]));
}

function getByParams(dataIn: UserType[], user: UserType): UserType[]{

  const userEntries = Object.entries(user);
  const length: number = userEntries.length;
  let response: UserType[] = dataIn;

  for(let index = 0; index < length; index++){
    response = filterByOneParam(userEntries[index], response);
  }

  return response;
}

function deleteOne(dataIn: UserType[], id: number): UserType[]{
  return dataIn.filter(user => user.id !== id);
}

function updateOne(dataIn: UserType[], oldUser: UserType, updateUser: UserType): UserType[]{
  dataIn.push({...oldUser, ...updateUser});
  return dataIn;
}

function addUser(dataIn: UserType[], newUser: UserType): UserType[]{
  dataIn.push(newUser);
  return dataIn;
}

//
function reduceMessage(prev: string, current: string): string {
  if(prev === '') return `${current}`;
  else return `${prev} && ${current}`;
}

//
function getMsgExceptionFilterDefault(message: string | [string]): string{
    
  if(Array.isArray(message)){
    return message.reduce((prev, current) => reduceMessage(prev,current), '');
  }
  else return message;
}

function getTimeZone(date: Date): string{

  const gmtZuluDate = date;
  const year = gmtZuluDate.getFullYear();
  const month = gmtZuluDate.getMonth();
  const day = gmtZuluDate.getDate();
  const hours = gmtZuluDate.getHours() - 5;
  const minutes = gmtZuluDate.getMinutes();
  const seconds = gmtZuluDate.getSeconds();
  const gmt05Date = new Date(year, month, day, hours, minutes, seconds);

  //
  return gmt05Date.toISOString().split(".")[0];
}

//
function buildDefaultHttpException(exceptionResponse: HttpExceptionFilterType): HttpExceptionType{
  return{
    fault: {
      statusCode: exceptionResponse.statusCode,
      error: exceptionResponse.error,
      message: getMsgExceptionFilterDefault(exceptionResponse.message),
      date: getTimeZone(new Date()),
      layer: 'CONTROLLER',
    }
  }
}

export default {
  getById,
  getByParams,
  deleteOne,
  updateOne,
  addUser,
  buildDefaultHttpException,
  getTimeZone,
  getMsgExceptionFilterDefault,
  reduceMessage,

}