import { IsString, IsNotEmpty, IsUrl, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class HauweiDataDto {
  @IsString()
  @IsNotEmpty()
  public inverterId: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public url: string;

  @IsString()
  @IsNotEmpty()
  public lat: string;

  @IsString()
  @IsNotEmpty()
  public long: string;
}

export class ElginDataDto {
  @IsString()
  @IsNotEmpty()
  public inverterId: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsBoolean()
  @IsOptional()
  public passwordIsEncrypted: boolean;

  @IsString()
  @IsNotEmpty()
  public lat: string;

  @IsString()
  @IsNotEmpty()
  public long: string;
}
