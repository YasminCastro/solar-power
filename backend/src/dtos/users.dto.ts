import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, ValidateIf } from 'class-validator';
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
  @IsNotEmpty()
  @ValidateIf(o => !o.password || (o.password && o.name))
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  @ValidateIf(o => !o.name || (o.password && o.name))
  public password: string;
}

