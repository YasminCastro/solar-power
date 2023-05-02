import { IsString, IsNotEmpty, IsUrl, ValidateIf } from 'class-validator';

export class CreateInversorsDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public model: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ValidateIf(o => !o.username)
  public url: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => !o.url)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => !o.url)
  public password: string;
}
