import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserRegisterDto } from '../../dtos'
import { UserRegister } from '../../entities'

@Injectable()
export class UserRegisterService {
    
    constructor(
        @InjectModel(UserRegister) private userRegisterModel: typeof UserRegister
    ) {}

    async create(userRegisterDto: UserRegisterDto): Promise<UserRegister> {

        let data: any = userRegisterDto
        let created: UserRegister = await this.userRegisterModel.build(data).save()

        const result: UserRegister = await this.userRegisterModel.findOne({
            where: {
                id: created.id
            }
        })

        return result ? result.get() : null
    }

    async getByUserId(userId: number): Promise<UserRegister> {

        let userRegister: UserRegister = await this.userRegisterModel.findOne({
            where: {
                userId
            }
        })

        return userRegister ? userRegister.get() : null
    }

    async updateByUserId(userId: number, userRegisterDto: UserRegisterDto): Promise<[affectedCount: number]> {
        let data: any = userRegisterDto
        return await this.userRegisterModel.update(data, {
            where: {
                userId
            }
        })
    }

    async removeByUserId(userId: number): Promise<number> {
        return await this.userRegisterModel.destroy({
            where: {
                userId
            }
        })
    }
}