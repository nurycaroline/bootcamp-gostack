import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllPRovidersDTO from "../dtos/IFindAllProvidersDTO";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllPRovidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
