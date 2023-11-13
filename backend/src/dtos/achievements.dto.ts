import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

export class UpdateAchivementsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsOptional()
  @IsNumber()
  public points: number;
}
