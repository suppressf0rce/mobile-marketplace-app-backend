import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Permission } from '@shared/core-user-module/entities/permission.entity';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let permissionRepository: MockProxy<Repository<Permission>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockDeep<Repository<Permission>>(),
        },
      ],
    }).compile();

    permissionService = moduleRef.get<PermissionService>(PermissionService);
    permissionRepository = moduleRef.get(getRepositoryToken(Permission));
  });

  describe('createPermission', () => {
    it('should create a permission', async () => {
      const permission = new Permission();
      permission.name = 'permission1';

      permissionRepository.create.mockReturnValue(permission);
      permissionRepository.save.mockResolvedValue(permission);

      const result = await permissionService.createPermission(permission);

      expect(result).toBe(permission);
      expect(permissionRepository.create).toHaveBeenCalledWith(permission);
    });
  });

  describe('updatePermission', () => {
    it('should update a permission', async () => {
      const permission = new Permission();
      permission.id = 1;
      permission.name = 'permission1';

      permissionRepository.save.mockResolvedValue(permission);

      const result = await permissionService.updatePermission(permission);

      expect(result).toBe(permission);
      expect(permissionRepository.save).toHaveBeenCalledWith(permission);
    });
  });

  describe('deletePermissionById', () => {
    it('should delete a permission by id', async () => {
      const id = 1;

      permissionRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      const result = await permissionService.deletePermissionById(id);

      expect(result).toEqual({ affected: 1, raw: {} });
      expect(permissionRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('getPermissionById', () => {
    it('should return a permission by id', async () => {
      const id = 1;
      const expectedPermission = new Permission();
      expectedPermission.id = id;
      expectedPermission.name = 'permission1';

      permissionRepository.findOneBy.mockResolvedValue(expectedPermission);

      const result = await permissionService.getPermissionById(id);

      expect(result).toEqual(expectedPermission);
      expect(permissionRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should return undefined if no permission is found with the given id', async () => {
      const id = 1;

      permissionRepository.findOneBy.mockResolvedValue(undefined);

      const result = await permissionService.getPermissionById(id);

      expect(result).toBeUndefined();
      expect(permissionRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
});
