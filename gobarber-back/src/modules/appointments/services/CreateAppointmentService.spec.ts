import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";
import AppError from "@shared/errors/AppError";
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it("should be able to create a new appointment", async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: "1234",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("1234");
  });

  it("should not be able to create two appointments on the same time", async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: "1234",
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: "1234",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
