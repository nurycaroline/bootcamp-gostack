import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it("should be able to list the month avaibility from providers", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 18, 0, 0),
    });

    const avaibility = await listProviderMonthAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
    });

    expect(avaibility).toEqual(
      expect.arrayContaining([
        { day: 19, avaibility: true },
        { day: 20, avaibility: false },
        { day: 21, avaibility: true },
        { day: 22, avaibility: true },
      ]),
    );
  });
});
