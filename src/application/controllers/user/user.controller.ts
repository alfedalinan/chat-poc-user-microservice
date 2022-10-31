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
      return await this.userService.create(userDto)
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
      return await this.userService.update(id, userDto)
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return await this.userService.remove(id)
    }
}