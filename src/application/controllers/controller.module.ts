import { Module } from "@nestjs/common"
import { ServiceModule } from "../services/service.module"
import { UserController, UserRegisterController } from "./"

@Module({
    controllers: [UserController, UserRegisterController], // <--- add every new controller here
    imports: [ServiceModule]
})
export class ControllerModule {}