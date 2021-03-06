import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appoinment from '../models/Appointment';
import AppoinmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppoinmentService {
  public async execute({ date, provider }: Request): Promise<Appoinment> {
    const appointmentsRepository = getCustomRepository(AppoinmentsRepository);
    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appoinmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppoinmentService;
