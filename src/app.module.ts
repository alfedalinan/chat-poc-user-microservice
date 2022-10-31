import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { SequelizeConfigService } from './shared/sequelize/sequelize.service'
import { ControllerModule } from './application/controllers/controller.module'
import { getEnvPath } from './shared/helpers/env.helper'


const envFilePath = getEnvPath(`${__dirname}/../`)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    SequelizeModule.forRootAsync({ useClass: SequelizeConfigService }),
    ControllerModule,
  ]
})
export class AppModule {}