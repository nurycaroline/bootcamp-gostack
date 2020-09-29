import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import ListProviderService from "./ListProviderService";

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;

describe("ListProviderService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviderService = new ListProviderService(fakeUserRepository);
  });

  it("should be able to list the providers", async () => {
    const user1 = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const user2 = await fakeUserRepository.create({
      name: "John Tre",
      email: "johntre@gmail.com",
      password: "123456",
    });

    const loggedUser = await fakeUserRepository.create({
      name: "John Qua",
      email: "johnqua@gmail.com",
      password: "123456",
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
