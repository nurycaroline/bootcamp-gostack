import { Router } from "express";

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import SessionService from "@modules/users/services/CreateSessionService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  const sessionService = new SessionService(usersRepository);

  const { user, token } = await sessionService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
