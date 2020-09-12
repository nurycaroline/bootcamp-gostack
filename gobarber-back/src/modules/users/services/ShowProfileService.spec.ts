import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe("ShowUserProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it("should be able to show the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("John Doe");
    expect(profile.email).toBe("johndoe@gmail.com");
  });

  it("should not be able to show the profile fom non-existing user", async () => {
    await expect(
      showProfileService.execute({
        user_id: "non-existing-user-id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
