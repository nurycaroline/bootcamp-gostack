import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";

describe("CreateSession", () => {
  it("should be able to authenticate", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const response = await createSessionService.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await expect(
      createSessionService.execute({
        email: "johndoe@gmail.com",
        password: "wrong-password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await expect(
      createSessionService.execute({
        email: "johndoe@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
