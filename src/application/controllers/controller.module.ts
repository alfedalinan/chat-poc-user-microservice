import { Module } from "@nestjs/common"
import { ServiceModule } from "../services/service.module"
import { UserController, UserRegisterController, UserContactController } from "./"

@Module({
    controllers: [UserController, UserRegisterController, UserContactController], // <--- add every new controller here
    imports: [ServiceModule]
})
export class ControllerModule {}