import { Router } from "express";

import SessionService from "../services/CreateSessionService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionService = new SessionService();

    const { user, token } = await sessionService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionRouter;
