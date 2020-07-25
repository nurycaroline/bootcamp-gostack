import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppError";
import CreateUserService from "./CreateUserService";

describe("CreateUserService", () => {
  it("should be able to create a new user", async () => {
    const fakeAppointmentsRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeAppointmentsRepository);

    const user = await createUserService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    const fakeAppointmentsRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeAppointmentsRepository);

    await createUserService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(
      createUserService.execute({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
