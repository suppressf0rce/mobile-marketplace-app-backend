import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '@shared/core-user-module/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockProxy<Repository<User>>;

  const user = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
    isEmailVerified: false,
    isAccountSuspended: false,
    roles: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockDeep<Repository<User>>(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);

      const result = await userService.createUser(user);

      expect(result).toEqual(user);
      expect(userRepository.create).toHaveBeenCalledWith(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      userRepository.save.mockResolvedValue(user);

      const result = await userService.updateUser(user);

      expect(result).toEqual(user);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by id', async () => {
      userRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      const result = await userService.deleteUserById(user.id);

      expect(result).toEqual({ affected: 1, raw: {} });
      expect(userRepository.delete).toHaveBeenCalledWith(user.id);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      userRepository.findOneBy.mockResolvedValue(user);

      const result = await userService.getUserById(user.id);

      expect(result).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      userRepository.findOneBy.mockResolvedValue(user);

      const result = await userService.getUserByEmail(user.email);

      expect(result).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: user.email,
      });
    });
  });
});
