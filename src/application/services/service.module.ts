import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User, UserContact, UserRegister } from '../entities'
import { UserService, UserRegisterService, UserContactService } from './'

@Module({
    imports: [
        SequelizeModule.forFeature([User, UserRegister, UserContact]) // <-- add every new entities here

    ],
    providers: [UserService, UserRegisterService, UserContactService], // <--- add every new service here
    exports: [UserService, UserRegisterService, UserContactService] // <--- add every new service here
})
export class ServiceModule {}