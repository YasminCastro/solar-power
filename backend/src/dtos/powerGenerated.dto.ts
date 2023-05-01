import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class HauweiDataDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public url: string;
}

export class ElginDataDto {
  @IsString()
  @IsNotEmpty()
  public elginUserName: string;

  @IsString()
  @IsNotEmpty()
  public elginPassword: string;
}
