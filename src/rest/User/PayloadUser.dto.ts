import { IsDefined, IsNotEmpty } from "class-validator";

export class PayloadUserDto{

    @IsDefined()
    @IsNotEmpty()
    id: number;

    @IsDefined()
    @IsNotEmpty()
    first_name: string;

    @IsDefined()
    @IsNotEmpty()
    last_name: string;

    @IsDefined()
    @IsNotEmpty()
    gender: string;

    @IsDefined()
    @IsNotEmpty()
    language: string;

    @IsDefined()
    @IsNotEmpty()
    age: number;

    @IsDefined()
    @IsNotEmpty()
    country: string;

    @IsDefined()
    @IsNotEmpty()
    city: string;

    @IsDefined()
    @IsNotEmpty()
    car_make: string;

    @IsDefined()
    @IsNotEmpty()
    car_model_year: number;

    @IsDefined()
    @IsNotEmpty()
    currency_code: string;

    @IsDefined()
    @IsNotEmpty()
    favorite_color: string;

    @IsDefined()
    @IsNotEmpty()
    credit_card_type: string;
}