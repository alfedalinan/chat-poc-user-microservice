import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UserRegisterService } from '../../services'
import { UserRegisterDto } from '../../dtos'
import { UserRegister } from '../../entities'

@Controller('user-registers')
export class UserRegisterController {
    constructor(private readonly userRegisterService: UserRegisterService) { }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() userRegisterDto: UserRegisterDto): Promise<UserRegister> {
      return await this.userRegisterService.create(userRegisterDto)
    }
  
    @Get('user-id/:user_id')
    async findOneByUserId(@Param('user_id', ParseIntPipe) userId: number): Promise<UserRegister> {
      return await this.userRegisterService.getByUserId(userId)
    }
  
    @Patch('user-id/:user_id')
    async updateByUserId(@Param('user_id', ParseIntPipe) userId: number, @Body() userRegisterDto: UserRegisterDto): Promise<[affectedCount: number]> {
      return await this.userRegisterService.updateByUserId(userId, userRegisterDto)
    }
  
    @Delete('user-id/:user_id')
    async removeByUserId(@Param('user_id', ParseIntPipe) userId: number): Promise<number> {
      return await this.userRegisterService.removeByUserId(userId)
    }
}