import { SetMetadata } from '@nestjs/common';
import { ProfileType } from 'src/enum/profileType.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ProfileType[]) => SetMetadata(ROLES_KEY, roles);