import { IsString, IsNotEmpty, IsUrl, ValidateIf, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateAchivementsDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public points: number;
}

export class UpdateInvertersDto {
  @IsString()
  public inverterId: string;

  @IsString()
  @IsOptional()
  public name: string;

  @IsBoolean()
  @IsOptional()
  public active: boolean;

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
