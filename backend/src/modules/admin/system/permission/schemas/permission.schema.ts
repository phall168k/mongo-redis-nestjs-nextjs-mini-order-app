import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({
    _id: true,
    id: true,
})
export class PermissionChild {
    _id: Types.ObjectId;

    @Prop({
        required: true,
        trim: true,
        unique: true,
    })
    name: string;
}

export const PermissionChildSchema = SchemaFactory.createForClass(PermissionChild);

@Schema({
    collection: 'permssions',
    timestamps: true,
    versionKey: false,
})
export class Permission {
    _id: Types.ObjectId;
    
    @Prop({
        required: true,
        unique: true,
        trim: true,
    })
    name: string;

    @Prop({
        type: [PermissionChild],
        default: [],
    })
    children: PermissionChild[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
