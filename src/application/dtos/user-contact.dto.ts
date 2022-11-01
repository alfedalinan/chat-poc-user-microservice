import { IsNotEmpty, IsNumber } from "class-validator"

class UserContactDto {
    id?: number

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    contactId: number
    
    displayFirstName?: string

    displayLastName?: string
}

export { UserContactDto }