import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/core-user-module/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

/** The UserService class provides methods for creating, updating, deleting, and retrieving user data
 from a repository. */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * This function creates a new user and returns a promise containing the created user.
   * @param {User} user - The parameter `user` is an object of type `User` which contains information
   * about a user that needs to be created. This object likely includes properties such as `name`,
   * `email`, `password`, and other relevant information. The `createUser` function is an asynchronous
   * function that takes in this
   * @returns A Promise that resolves to a User object.
   */
  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  /**
   * This function updates a user in a database and returns the updated user.
   * @param {User} user - The parameter `user` is an object of type `User` which contains information
   * about a user. This method `updateUser` takes this `user` object as input and returns a Promise
   * that resolves to the updated `User` object after saving it to the database using the
   * `userRepository.save()` method
   * @returns The `updateUser` function is returning a Promise that resolves to a `User` object. The
   * `User` object is the result of saving the updated user data to the database using the `save`
   * method of the `userRepository`.
   */
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * This function deletes a user from the database by their ID and returns a Promise with the result
   * of the deletion.
   * @param {number} id - The id parameter is a number that represents the unique identifier of a user
   * that needs to be deleted from the database. The function is an asynchronous function that returns
   * a Promise that resolves to a DeleteResult object. The DeleteResult object contains information
   * about the number of rows affected by the delete operation.
   * @returns The `deleteUserById` function is returning a `Promise` that resolves to a `DeleteResult`
   * object. The `DeleteResult` object contains information about the result of the delete operation,
   * such as the number of rows affected.
   */
  async deleteUserById(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  /**
   * This function retrieves a user by their ID from a repository and returns it as a Promise.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * user. The `getUserById` function is an asynchronous function that takes in this `id` parameter and
   * returns a Promise that resolves to a `User` object or `undefined` if no user is found with the
   * given `
   * @returns The `getUserById` function is returning a Promise that resolves to either a `User` object
   * or `undefined`. The `User` object represents a user entity retrieved from the database using the
   * `id` parameter passed to the function. If no user is found with the given `id`, the function
   * returns `undefined`.
   */
  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: id });
  }

  /**
   * This function returns a promise that resolves to a user object with a given email or undefined if
   * no user is found.
   * @param {string} email - The email parameter is a string that represents the email address of a
   * user. This function is designed to retrieve a user from a repository based on their email address.
   * @returns The `getUserByEmail` function is returning a Promise that resolves to either a `User`
   * object or `undefined`. The `User` object represents a user in the system and contains information
   * such as their email, name, and other details. If no user is found with the specified email, the
   * function will return `undefined`.
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }
}
