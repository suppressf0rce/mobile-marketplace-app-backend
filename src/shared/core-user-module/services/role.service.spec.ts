import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '@shared/core-user-module/entities/role.entity';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: MockProxy<Repository<Role>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockDeep<Repository<Role>>(),
        },
      ],
    }).compile();

    roleService = moduleRef.get<RoleService>(RoleService);
    roleRepository = moduleRef.get(getRepositoryToken(Role));
  });

  describe('createRole', () => {
    it('should create a role', async () => {
      const role = new Role();
      role.name = 'role1';

      roleRepository.create.mockReturnValue(role);
      roleRepository.save.mockResolvedValue(role);

      const result = await roleService.createRole(role);

      expect(result).toBe(role);
      expect(roleRepository.create).toHaveBeenCalledWith(role);
    });
  });

  describe('updateRole', () => {
    it('should update a role', async () => {
      const role = new Role();
      role.id = 1;
      role.name = 'role1';

      roleRepository.save.mockResolvedValue(role);

      const result = await roleService.updateRole(role);

      expect(result).toBe(role);
      expect(roleRepository.save).toHaveBeenCalledWith(role);
    });
  });

  describe('deleteRoleById', () => {
    it('should delete a role by id', async () => {
      const id = 1;

      roleRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      const result = await roleService.deleteRoleById(id);

      expect(result).toEqual({ affected: 1, raw: {} });
      expect(roleRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('getRoleById', () => {
    it('should return a role by id', async () => {
      const id = 1;
      const expectedRole = new Role();
      expectedRole.id = id;
      expectedRole.name = 'role1';

      roleRepository.findOneBy.mockResolvedValue(expectedRole);

      const result = await roleService.getRoleById(id);

      expect(result).toEqual(expectedRole);
      expect(roleRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should return undefined if no role is found with the given id', async () => {
      const id = 1;

      roleRepository.findOneBy.mockResolvedValue(undefined);

      const result = await roleService.getRoleById(id);

      expect(result).toBeUndefined();
      expect(roleRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
});
