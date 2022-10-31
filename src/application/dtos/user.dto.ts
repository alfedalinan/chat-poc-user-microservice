import { IsNotEmpty } from "class-validator"

class UserDto {
    id?: number
    
    @IsNotEmpty()
    username?: string

    @IsNotEmpty()
    email?: string

    @IsNotEmpty()
    password?: string  
}

export { UserDto }