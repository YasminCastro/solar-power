import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class GetInversorDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public url: string;
}

export class UpdateInversorDto {
  @IsString()
  @IsNotEmpty()
  public url: string;
}
