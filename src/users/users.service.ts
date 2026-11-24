import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHasher } from '@nestjs/authentication';
import { Role } from '../roles/entities/role.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hasher: PasswordHasher,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.existsBy({ email: createUserDto.email })) {
      throw new ConflictException('Email ya registrado');
    }
    const password = await this.hasher.hash(createUserDto.password);
    const user = this.userRepository.create({
      email: createUserDto.email,
      password,
      name: createUserDto.name,
      phone: createUserDto.phone,
    });
    return this.userRepository.save(user);
  }

  async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { roles: true },
    });
    const valid = await this.hasher.verify(password, user?.password);
    return user && valid ? user : null;
  }

  async findByIdWithRoles(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  async findAll() {
    const listaUser = await this.userRepository.find({
      relations: { roles: true },
      select: {
        id: true,
        email: true,
        name: true,
        roles: true,
      },
    });
    if (!listaUser) {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
    return listaUser;
  }

  async asignarRolesToUser(body: string[], id: string) {
    const usersExistentes = await this.userRepository.findOne({
      where: {id},
      relations: {roles:true}
    });

    if (!usersExistentes) {
      throw new NotFoundException('usuario no encontrado');
    }

    const uniqueNames = [...new Set(body)];
    const rolesExistentes = await this.roleRepository.findBy({
      role_name: In(uniqueNames),
    });

    if (rolesExistentes.length === 0 || rolesExistentes.length !== uniqueNames.length) {
    throw new BadRequestException('roles inválidos');
      }
      usersExistentes.roles = rolesExistentes;
      await this.userRepository.save(usersExistentes);

      return { message: 'Roles asignados' };
    
    }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}