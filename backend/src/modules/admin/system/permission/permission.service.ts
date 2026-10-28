import { Injectable } from '@nestjs/common';
import { CreatePermissionRequestDto } from './dto/create-permission-request.dto';
import { UpdatePermissionRequestDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { PermissionMapper } from './permission.mapper';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  public async create(dto: CreatePermissionRequestDto) {
    try {
      const model = await this.permissionModel.create(dto);
      return model;
    } catch (error) {
      throw error;
    }
  }

  public async findAllForSelectOption(): Promise<PermissionResponseDto[]> {
    const documents = await this.permissionModel
      .find()
      .select('_id name children')
      .sort({ name: 1 })
      .lean()
      .exec();

    return PermissionMapper.toSelectDtoList(documents);
  }
}
