import { Module } from "@nestjs/common";
import { ServiceModule } from "../services/service.module";
import { UserController } from "./user/user.controller";

@Module({
    controllers: [UserController], // <--- add every new controller here
    imports: [ServiceModule]
})
export class ControllerModule {}