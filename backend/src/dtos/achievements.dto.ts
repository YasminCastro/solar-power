import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAchivementsDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public points: number;

  @IsString()
  @IsOptional()
  public achivementImage: string;
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

  @IsString()
  @IsOptional()
  public achivementImage: string;
}
