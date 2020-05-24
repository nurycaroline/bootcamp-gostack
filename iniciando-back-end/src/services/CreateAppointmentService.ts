import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentsDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentsDate,
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentsDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
