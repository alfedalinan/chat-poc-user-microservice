import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../entities';
import { UserService } from './user/user.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User]) // <-- add every new entities here

    ],
    providers: [UserService], // <--- add every new service here
    exports: [UserService] // <--- add every new service here
})
export class ServiceModule {}