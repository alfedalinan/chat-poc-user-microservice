import { IsString, IsNotEmpty  } from "class-validator"

class UserDto {
    id?: number
    
    @IsNotEmpty()
    username?: string

    @IsNotEmpty()
    email?: string

    @IsNotEmpty()
    password?: string
    
    @IsString()
    firstName?: string

    @IsString()
    lastName?: string
}

export { UserDto }