import { Router } from "express";
import { container } from "tsyringe";

import SessionService from "@modules/users/services/CreateSessionService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const sessionService = container.resolve(SessionService);

  const { user, token } = await sessionService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
