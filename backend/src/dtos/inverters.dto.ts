import { IsString, IsNotEmpty, IsUrl, ValidateIf, IsNumber, IsOptional } from 'class-validator';

export class CreateInvertersDto {
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

  @IsString()
  @IsNotEmpty()
  public cep: string;

  @IsString()
  @IsNotEmpty()
  public lat: string;

  @IsString()
  @IsNotEmpty()
  public long: string;

  @IsNumber()
  @IsNotEmpty()
  public maxRealTimePower: number;
}

export class UpdateInvertersDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public model: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ValidateIf(o => !o.username)
  public url: string;

  @IsString()
  @IsOptional()
  @ValidateIf(o => !o.url)
  public username: string;

  @IsString()
  @IsOptional()
  @ValidateIf(o => !o.url)
  public password: string;

  @IsString()
  @IsOptional()
  public cep: string;

  @IsString()
  @IsOptional()
  public lat: string;

  @IsString()
  @IsOptional()
  public long: string;

  @IsNumber()
  @IsOptional()
  public maxRealTimePower: number;
}