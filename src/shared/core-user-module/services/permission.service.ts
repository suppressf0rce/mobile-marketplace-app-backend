import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@shared/core-user-module/entities/permission.entity';
import { DeleteResult, Repository } from 'typeorm';

/** The PermissionService class provides methods for creating, updating, deleting, and retrieving
 permissions from a repository. */
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  /**
   * This function creates a new permission and returns it as a Promise.
   * @param {Permission} permission - The parameter `permission` is an object of type `Permission` that
   * contains the data needed to create a new permission. The exact properties of the `Permission`
   * object will depend on the specific implementation of the `Permission` class, but it might include
   * things like a name, description, and level of
   * @returns A Promise that resolves to a Permission object.
   */
  async createPermission(permission: Permission): Promise<Permission> {
    return this.permissionRepository.create(permission);
  }

  /**
   * This function updates a permission in a repository and returns the updated permission.
   * @param {Permission} permission - The parameter `permission` is of type `Permission`, which is
   * likely an interface or a class representing a permission object with various properties such as
   * `id`, `name`, `description`, etc. The `updatePermission` function takes in a `permission` object
   * and saves it to the database using the
   * @returns A Promise that resolves to a Permission object.
   */
  async updatePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }

  /**
   * This function deletes a permission by its ID and returns a Promise containing the result of the
   * deletion.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * permission that needs to be deleted from the database. The function `deletePermissionById` is an
   * asynchronous function that takes in this `id` parameter and returns a `Promise` that resolves to a
   * `DeleteResult` object.
   * @returns The `deletePermissionById` function is returning a `Promise` that resolves to a
   * `DeleteResult` object. The `DeleteResult` object contains information about the result of the
   * delete operation, such as the number of affected rows.
   */
  async deletePermissionById(id: number): Promise<DeleteResult> {
    return this.permissionRepository.delete(id);
  }

  /**
   * This function retrieves a permission by its ID from a repository and returns it as a Promise.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * permission. The `getPermissionById` function is an asynchronous function that takes in this `id`
   * parameter and returns a Promise that resolves to a `Permission` object if a permission with the
   * specified `id` is found in
   * @returns The `getPermissionById` function is returning a Promise that resolves to either a
   * `Permission` object or `undefined`. The `Permission` object represents a permission entity
   * retrieved from the `permissionRepository` using the `findOneBy` method with the `id` parameter. If
   * no permission entity is found with the given `id`, the function will return `undefined`.
   */
  async getPermissionById(id: number): Promise<Permission | undefined> {
    return this.permissionRepository.findOneBy({ id: id });
  }
}
