import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';
import { UsersService } from './users.service.js';
import { User } from './entities/user.entity.js';
import { AssignRolesDto } from './dto/assing-roles.dto.js';
import { UserPolicy } from "./user.policy.js";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Can.Anyone()
  @Get('me')
  async getProfile(@CurrentUser() currentUser: User) {
    const user = await this.usersService.findByIdWithRoles(currentUser.id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles,
    };
  }

  @Can(UserPolicy, 'list')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Can(UserPolicy, 'assignRoles')
  @Patch(':id/roles')
  asignarRoles(@Param('id') id: string, @Body() dto: AssignRolesDto) {
    return this.usersService.asignarRolesToUser(dto.roles, id);
  }
}