import {
  IsEmail,
  IsNotEmpty,
  IsString, Matches,
  MaxLength,
  MinLength
} from "class-validator";


const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(passwordRegex, { message: "Password must contain both numeric and alphabetic symbols" })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
}