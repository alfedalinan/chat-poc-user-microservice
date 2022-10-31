import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { User } from '../../entities'
import { UserService } from "../../services/user/user.service";
import { UserDto } from '../../dtos'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() userDto: UserDto) {
      let user = new User()
      user.email = userDto.email
      user.name = userDto.name
      user.password = userDto.password

      return await this.userService.create(user)
    }
  
    @Get()
    async findAll() {
      return await this.userService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.userService.findOne(id);
    }
  
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto) {
      let user = new User()
      user.name = userDto.name
      user.email = userDto.email
      user.password = userDto.password

      return await this.userService.update(id, user)
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return await this.userService.remove(id)
    }
}