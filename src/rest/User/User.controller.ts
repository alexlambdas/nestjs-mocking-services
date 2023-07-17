import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigAppService } from './ConfigApp.service';
import { PayloadUserDto } from './PayloadUser.dto';
import { QueryUserDto } from './QueryUser.dto';
import { ResponseDto } from './Response.dto';
import Features from './Features';

@Controller('/nestjs/mocking/services/rest/users')
export class UserController {

  constructor(private configApp: ConfigAppService) {}

  /**
   * 
   * @param bodyIn 
   * 
   * @returns 
   * 
   */
  @Get()
  async getByParams(@Query() bodyIn: QueryUserDto): Promise<ResponseDto>{

    const getUserByParams: PayloadUserDto[] = Features.getByParams(this.configApp.getData(), bodyIn);

    const response: ResponseDto = {
      statusCode: 200,
      statusMessage: 'ok',
      descriptionMessage: 'user found',
      response: getUserByParams,
    };

    return response;
  }


  /**
   * 
   * @param id 
   * 
   * @returns 
   * 
   */
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<ResponseDto>{

    const objUserDto: PayloadUserDto[] = Features.getById(this.configApp.getData(), Number(id));
    const deleteOne: PayloadUserDto[] = Features.deleteOne(this.configApp.getData(), Number(id));

    if(deleteOne.length < this.configApp.getData().length){
      
      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'ok',
        descriptionMessage: 'deleted user',
        response: objUserDto,
      };

      this.configApp.setData(deleteOne);

      return response;
    }
    else{
      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'error',
        descriptionMessage: 'not found user',
        response: objUserDto,
      };
      return response;
    }
  }


  /**
   * 
   * @param bodyIn 
   * 
   * @returns 
   * 
   */
  @Put()
  async updateOne(@Body() bodyIn: QueryUserDto): Promise<ResponseDto>{

    const oldUser: PayloadUserDto[] = Features.getById(this.configApp.getData(), Number(bodyIn.id));

    if(oldUser.length >= 1){

      let newData: PayloadUserDto[] = Features.deleteOne(this.configApp.getData(), oldUser[0].id);
      this.configApp.setData(newData);

      newData = Features.updateOne(this.configApp.getData(), oldUser[0], bodyIn);
      this.configApp.setData(newData);

      const updatedUser: PayloadUserDto[] = Features.getById(this.configApp.getData(), Number(bodyIn.id));

      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'ok',
        descriptionMessage: 'updated user',
        response: updatedUser,
      };

      return response;
    }
    else{

      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'error',
        descriptionMessage: 'not found user',
        response: [],
      };

      return response;
    }
  }


  /**
   * 
   * @param bodyIn 
   * 
   * @returns 
   * 
   */
  @Post()
  @UsePipes(ValidationPipe)
  async addOneUser(@Body() bodyIn: PayloadUserDto): Promise<ResponseDto>{

    const ifAExistisNewUser: PayloadUserDto[] = Features.getById(this.configApp.getData(), Number(bodyIn.id));

    if(ifAExistisNewUser.length >= 1){

      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'error',
        descriptionMessage: 'user id already existis',
        response: [],
      };

      return response;
    }
    else{

      const newData: PayloadUserDto[] = Features.addUser(this.configApp.getData(), bodyIn);
      this.configApp.setData(newData);

      const response: ResponseDto = {
        statusCode: 200,
        statusMessage: 'ok',
        descriptionMessage: 'added new user',
        response: [bodyIn],
      };

      return response;
    }
  }
}
