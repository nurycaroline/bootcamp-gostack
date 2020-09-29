import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password: pass } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const {
      password,
      ...userWithoutPassword
    } = await createUserService.execute({ name, email, password: pass });

    return response.json({
      user: userWithoutPassword,
    });
  }
}
