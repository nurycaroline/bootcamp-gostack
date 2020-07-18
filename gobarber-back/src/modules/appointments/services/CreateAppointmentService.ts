import { startOfHour } from "date-fns";

import AppError from "@shared/errors/AppError";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    date,
    provider_id,
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
    });

    return appointment;
  }
}

export default CreateAppointmentService;
