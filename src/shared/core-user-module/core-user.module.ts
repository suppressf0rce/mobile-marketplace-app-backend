import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@shared/core-user-module/services/user.service';
import { User } from '@shared/core-user-module/entities/user.entity';
import { Role } from '@shared/core-user-module/entities/role.entity';
import { Permission } from '@shared/core-user-module/entities/permission.entity';
import { RoleService } from '@shared/core-user-module/services/role.service';
import { PermissionService } from '@shared/core-user-module/services/permission.service';

/** This is a shared module in a TypeScript application that imports and exports services related to users,
roles, and permissions using TypeORM. */
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  providers: [UserService, RoleService, PermissionService],
  exports: [UserService, RoleService, PermissionService],
})
export class UserCoreModule {}
