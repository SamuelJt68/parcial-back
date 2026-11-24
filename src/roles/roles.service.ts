import { CreateRoleDto } from './dto/create-role.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleData = createRoleDto;

    if (!roleData.role_name) {
      throw new BadRequestException('role_name es requerido');
    }

    const nameRoleExistente = await this.roleRepository.findOneBy({
      role_name: roleData.role_name,
    });

    if (nameRoleExistente) {
      throw new ConflictException('role_name ya existe');
    }

    const nuevoRol = this.roleRepository.create({
      role_name: roleData.role_name,
      description: roleData.description,
    });
    const rolGuardado = await this.roleRepository.save(nuevoRol);

    return {
      message: 'Rol creado con éxito',
      roleId: rolGuardado.id,
    };
  }

  async findAll() {
    try {
      return await this.roleRepository.find({
        select: {
          id: true,
          role_name: true,
          description: true,
        },
      });
    } catch {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: string) {
    
  }
}