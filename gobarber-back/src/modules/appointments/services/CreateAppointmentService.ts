import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from "@shared/errors/AppError";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppointmentsRepository from "@modules/appointments/repositories/AppointmentsRepository";

interface RequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentsDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentsDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentsDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
