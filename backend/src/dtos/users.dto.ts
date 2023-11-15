import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsNumber, IsDate } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @MinLength(9)
  @MaxLength(32)
  @IsOptional()
  public password?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsNumber()
  @IsOptional()
  public level?: number;

  @IsNumber()
  @IsOptional()
  public loginStreak?: number;

  @IsDate()
  @IsOptional()
  public lastLoginDate?: Date;
}
