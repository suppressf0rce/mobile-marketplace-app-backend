import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@shared/core-user-module/entities/role.entity';
import { DeleteResult, Repository } from 'typeorm';

/** The RoleService class provides methods for creating, updating, deleting, and retrieving Role objects
 from a repository. */
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * This function creates a new role and returns it as a Promise.
   * @param {Role} role - The parameter `role` is an object of type `Role` that contains information
   * about a role. This object is passed as an argument to the `createRole` function. The function then
   * uses this object to create a new role in the database using the `roleRepository.create` method.
   * The function
   * @returns A Promise that resolves to a Role object.
   */
  async createRole(role: Role): Promise<Role> {
    return this.roleRepository.create(role);
  }

  /**
   * This function updates a role and returns the updated role object.
   * @param {Role} role - Role object that contains the updated information for a specific role.
   * @returns A Promise that resolves to a Role object.
   */
  async updateRole(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  /**
   * This function deletes a role from the database by its ID and returns a Promise with the result of
   * the deletion.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * role that needs to be deleted from the database.
   * @returns The `deleteRoleById` function is returning a Promise that resolves to a `DeleteResult`
   * object. The `DeleteResult` object contains information about the result of the delete operation,
   * such as the number of rows affected.
   */
  async deleteRoleById(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }

  /**
   * This function retrieves a role by its ID from a repository and returns it as a Promise.
   * @param {number} id - The parameter "id" is a number that represents the unique identifier of a
   * role. The function "getRoleById" takes this parameter and returns a Promise that resolves to a Role
   * object or undefined if no role with the given id is found in the roleRepository.
   * @returns A promise that resolves to either a `Role` object or `undefined`.
   */
  async getRoleById(id: number): Promise<Role | undefined> {
    return this.roleRepository.findOneBy({ id: id });
  }
}
