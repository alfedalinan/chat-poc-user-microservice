import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User, UserRegister } from '../entities';
import { UserService, UserRegisterService } from './';

@Module({
    imports: [
        SequelizeModule.forFeature([User, UserRegister]) // <-- add every new entities here

    ],
    providers: [UserService, UserRegisterService], // <--- add every new service here
    exports: [UserService, UserRegisterService] // <--- add every new service here
})
export class ServiceModule {}