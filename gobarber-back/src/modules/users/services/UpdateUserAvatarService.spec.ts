import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to insert a new avatar to user", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should not be able to update avatar from non existing user", async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: "non-existing-user",
        avatarFileName: "avatar.jpg",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating new one", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar.jpg",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: "avatar2.jpg",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");
    expect(user.avatar).toBe("avatar2.jpg");
  });
});
