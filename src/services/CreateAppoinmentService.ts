import { startOfHour } from 'date-fns';
import Appoinment from '../models/Appoinment';
import AppoinmentsRepository from '../repositories/AppoinmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppoinmentService {
  private appoinmentsRepository: AppoinmentsRepository;

  constructor(appoinmentsRepository: AppoinmentsRepository) {
    this.appoinmentsRepository = appoinmentsRepository;
  }

  public execute({ date, provider }: Request): Appoinment {
    const appoinmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appoinmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appoinmentsRepository.create({
      provider,
      date: appoinmentDate,
    });

    return appointment;
  }
}

export default CreateAppoinmentService;
