import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import SessionService from "@modules/users/services/CreateSessionService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionService = container.resolve(SessionService);

    const { user, token } = await sessionService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
