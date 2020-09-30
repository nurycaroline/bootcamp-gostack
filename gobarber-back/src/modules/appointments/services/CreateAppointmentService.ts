import { startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

interface IRequestDTO {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentsDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentsDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentsDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
