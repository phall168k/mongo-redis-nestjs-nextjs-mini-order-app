
import { Types } from 'mongoose';
import { PermissionResponseDto } from './dto/permission-response.dto';

export interface PermissionMapperInput {
  _id: Types.ObjectId;
  name: string;
  children: {
    _id: Types.ObjectId;
    name: string;
  }[];
}

export class PermissionMapper {
  public static toSelectDto(
    document: PermissionMapperInput,
  ): PermissionResponseDto {
    return {
      id: document._id.toString(),
      name: document.name,
      children: (document.children ?? []).map((child) => ({
        id: child._id.toString(),
        name: child.name,
      })),
    };
  }

  public static toSelectDtoList(
    documents: PermissionMapperInput[],
  ): PermissionResponseDto[] {
    return documents.map((document) =>
      this.toSelectDto(document),
    );
  }
}
