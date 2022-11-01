import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { UserContactDto } from '../../dtos'
import { UserContactService } from '../../services'

@Controller('user-contacts')
export class UserContactController {
    constructor(private readonly userContactService: UserContactService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() userContactDto: UserContactDto) {
        return await this.userContactService.create(userContactDto)
    }

    @Get(':user_id')
    async getByUserId(@Param('user_id', ParseIntPipe) userId: number) {
        return await this.userContactService.getByUserId(userId)
    }

    @Get(':user_id/:contact_id')
    async getOne(@Param('user_id', ParseIntPipe) userId: number, @Param('contact_id', ParseIntPipe) contactId: number) {
        return await this.userContactService.getOne(userId, contactId)
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() userContactDto: UserContactDto) {
        return await this.userContactService.update(id, userContactDto)
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.userContactService.remove(id)
    }
}