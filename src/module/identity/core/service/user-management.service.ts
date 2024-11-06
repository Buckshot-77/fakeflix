import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

import { UserModel } from '@identityModule/core/model/user.model';
import { UserRepository } from '@identityModule/persistence/repository/user.repository';
import { DomainException } from '@sharedLibs/core/exception/domain.exception';

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

//TODO move to a configuration
export const PASSWORD_HASH_SALT = 10;

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: CreateUserDto) {
    if (!this.validateEmail(user.email)) {
      throw new DomainException(`Invalid email: ${user.email}`);
    }
    const newUser = UserModel.create({
      ...user,
      password: await argon2.hash(user.password, { salt: PASSWORD_HASH_SALT }),
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
