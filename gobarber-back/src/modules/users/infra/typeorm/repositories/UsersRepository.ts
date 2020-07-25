import { getRepository, Repository } from "typeorm";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    this.ormRepository.save(user);

    return user;
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { date },
    });

    return findUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
