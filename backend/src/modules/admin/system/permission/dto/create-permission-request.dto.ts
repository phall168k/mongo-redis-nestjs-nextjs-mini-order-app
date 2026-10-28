import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreatePermissionChildRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    name: string;
}

export class CreatePermissionRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    name: string;

    @ApiProperty({ type: [CreatePermissionChildRequestDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePermissionChildRequestDto )
    children?: CreatePermissionChildRequestDto[];
}
