import AppError from "@shared/errors/AppError";

import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe("UpdateUserProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: "John Tre",
      email: "johntre@gmail.com",
    });

    expect(updateUser.name).toBe("John Tre");
    expect(updateUser.email).toBe("johntre@gmail.com");
  });

  it("should not be able to change to another user email", async () => {
    await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const user = await fakeUserRepository.create({
      name: "John Tre",
      email: "johntre@gmail.com",
      password: "123456",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John Tre",
        email: "johndoe@gmail.com",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: "John Tre",
      email: "johntre@gmail.com",
      old_password: "123456",
      password: "123123",
    });

    expect(updateUser.password).toBe("123123");
  });

  it("should be not able to update the password without old password", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John Tre",
        email: "johntre@gmail.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to update the password with wrong old password", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John Tre",
        email: "johntre@gmail.com",
        old_password: "wrong old password",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
