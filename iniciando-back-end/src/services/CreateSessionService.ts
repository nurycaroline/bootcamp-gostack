import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/User";

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password combination.");
    }

    const token = sign({}, "70b1632c51e8e4b8b817f3a0ed93dff0", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user, token };
  }
}

export default CreateSessionService;
