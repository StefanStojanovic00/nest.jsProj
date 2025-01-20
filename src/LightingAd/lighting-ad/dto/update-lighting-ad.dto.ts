import { PartialType } from '@nestjs/mapped-types';
import { CreateLightingAdDto } from './create-lighting-ad.dto';

export class UpdateLightingAdDto extends PartialType(CreateLightingAdDto) {
    id:number;
}
