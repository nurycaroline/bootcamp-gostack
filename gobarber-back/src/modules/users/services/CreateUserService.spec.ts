import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import CreateUserService from "./CreateUserService";

describe("CreateUserService", () => {
  it("should be able to create a new user", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

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
      createUserService.execute({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
