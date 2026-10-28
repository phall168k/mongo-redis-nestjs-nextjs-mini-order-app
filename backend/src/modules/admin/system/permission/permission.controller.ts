import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionRequestDto } from './dto/create-permission-request.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.dto';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PermissionResponseDto } from './dto/permission-response.dto';

@Controller({
  path: 'admin/system/permissions',
  version: '1',
})
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOkResponse({ type: PermissionResponseDto })
  public create(@Body() createPermissionDto: CreatePermissionRequestDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('select-options')
  @ApiOperation({ summary: 'Find all permission for select options' })
  @ApiOkResponse({ type: [PermissionResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Unthorized' })
  public async findAllForSelectOption(): Promise<PermissionResponseDto[]>{
    return this.permissionService.findAllForSelectOption();
  }
}
