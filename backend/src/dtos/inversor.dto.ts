import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateInversorDto {
  @IsString()
  @IsNotEmpty()
  public model: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  public url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public inversorUsername: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public inversorPassword: string;
}
