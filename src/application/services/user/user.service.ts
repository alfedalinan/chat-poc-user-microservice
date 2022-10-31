import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../../entities'
import { Model } from 'sequelize'
import { UserDto } from '../../dtos'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(userDto: UserDto) {
        let data: any = userDto
        const created = await this.userModel.build(data).save()
        const result = await this.userModel.findOne({
            where: {
                id: created.id
            }
        })

        return result
    }

    async findAll() {
        return await this.userModel.findAll()
    }

    async findOne(id: number) {
        return await this.userModel.findOne({
            where: {
                id
            }
        })
    }

    async update(id: number, userDto: UserDto) {
        let data: any = userDto
        return await this.userModel.update(data, {
            where: {
                id
            }
        })
    }

    async remove(id: number) {
        return await this.userModel.destroy({
            where: {
                id
            }
        })
    }
}
