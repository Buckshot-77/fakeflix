import { Injectable } from '@nestjs/common';
import { UserModel } from '@identityModule/core/model/user.model';
import { UserRepository } from '@identityModule/persistence/repository/user.repository';
import { hash } from 'argon2';
import { DomainException } from '@sharedLibs/core/exeption/domain.exception';

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: CreateUserDTO) {
    if (!this.validateEmail(user.email)) {
      throw new DomainException(`Invalid email: ${user.email}`);
    }

    const passwordHash = await hash(user.password);

    const newUser = UserModel.create({
      ...user,
      password: passwordHash,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  private validateEmail(email: string): boolean {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
  }

  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
