import { IsNotEmpty, IsOptional } from "class-validator";

export class QueryUserDto{

    @IsOptional()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    first_name: string;

    @IsOptional()
    @IsNotEmpty()
    last_name: string;

    @IsOptional()
    @IsNotEmpty()
    gender: string;

    @IsOptional()
    @IsNotEmpty()
    language: string;

    @IsOptional()
    @IsNotEmpty()
    age: number;

    @IsOptional()
    @IsNotEmpty()
    country: string;

    @IsOptional()
    @IsNotEmpty()
    city: string;

    @IsOptional()
    @IsNotEmpty()
    car_make: string;

    @IsOptional()
    @IsNotEmpty()
    car_model_year: number;

    @IsOptional()
    @IsNotEmpty()
    currency_code: string;

    @IsOptional()
    @IsNotEmpty()
    favorite_color: string;

    @IsOptional()
    @IsNotEmpty()
    credit_card_type: string;
}