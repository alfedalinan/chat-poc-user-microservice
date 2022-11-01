import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserContactDto } from '../../dtos'
import { User, UserContact } from '../../entities'


@Injectable()
export class UserContactService {

    constructor(
        @InjectModel(UserContact) private userContactModel: typeof UserContact,
        @InjectModel(User) private userModel: typeof User
    ) {}
    
    async create(userContactDto: UserContactDto): Promise<UserContact> {
        let data: any = userContactDto
        let created = await this.userContactModel.build(data).save()

        const result = await this.userContactModel.findOne({
            where: {
                id: created.id
            }
        })

        return result ? result.get() : null
    }

    async getByUserId(userId: number): Promise<User> {
        
        const result = await this.userModel.findOne({
            where: {
                id: userId
            },
            include: [UserContact]
        })

        return result ? result.get() : null
    }

    async getOne(userId: number, contactId: number): Promise<UserContact> {

        const result = await this.userContactModel.findOne({
            where: { userId, contactId }
        })

        return result ? result.get() : null
    }

    async update(id: number, userContactDto: UserContactDto): Promise<[affectedCount: number]> {
        let data: any = userContactDto
        return await this.userContactModel.update(data, {
            where: { id }
        })
    }

    async remove(id: number): Promise<number> {
        return await this.userContactModel.destroy({ where: { id } })
    }
}