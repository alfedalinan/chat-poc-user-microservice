import { IsNotEmpty, IsNumber } from "class-validator"

class UserRegisterDto {
    id?: number
    
    @IsNumber()
    userId?: number

    @IsNotEmpty()
    registerId: string

    ipPort?: string

    ipAddress?: string

    expiresAt?: string
}

export { UserRegisterDto }