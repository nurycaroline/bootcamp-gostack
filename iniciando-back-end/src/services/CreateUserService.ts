import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateAppointmentService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error("Email address already used.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateAppointmentService;
