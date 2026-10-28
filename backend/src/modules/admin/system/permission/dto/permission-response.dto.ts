import { ApiProperty } from "@nestjs/swagger";

export class PermissionChildResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}

export class PermissionResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: [PermissionChildResponseDto] })
    children: PermissionChildResponseDto[];
}