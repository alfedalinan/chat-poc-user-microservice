import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize'

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService
    
    public createSequelizeOptions(connectionName?: string): SequelizeModuleOptions | Promise<SequelizeModuleOptions> {
        return {
            dialect: 'mysql',
            host: this.config.get('DB_HOST'),
            username: this.config.get('DB_USER'),
            password: this.config.get('DB_PASSWORD'),
            database: this.config.get('DB_NAME'),
            models: [
                `${__dirname}/../**/*.entity.{ts,js}`
            ],
            autoLoadModels: true,
            synchronize: true
        }
    }
}