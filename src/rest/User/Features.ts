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

export default {
  getById,
  getByParams,
  deleteOne,
  updateOne,
  addUser,
}