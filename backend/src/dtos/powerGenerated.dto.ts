import { IsString, IsNotEmpty, IsUrl, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class HauweiDataDto {
  @IsNumber()
  @IsNotEmpty()
  public inversorId: number;

  @IsNumber()
  @IsNotEmpty()
  public userId: number;

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
  @IsNumber()
  @IsNotEmpty()
  public inversorId: number;

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
