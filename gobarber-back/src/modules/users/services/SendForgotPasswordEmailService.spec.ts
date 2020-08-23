import AppError from "@shared/errors/AppError";

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokensRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmailService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it("should be able to recover the password usinf the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@gmail.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a mon-existing user password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: "johndoe@gmail.com",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generete a forgot password", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@gmail.com",
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
