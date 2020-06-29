import Appoinment from '../models/Appoinment'
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppoinmentsRepository {
  constructor() {
    this.appointments = []
  }

  private appointments: Appoinment[]

  public all(): Appoinment[] {
    return this.appointments
  }

  public findByDate(date: Date): Appoinment | null {
    const findAppointment = this.appointments.find(appoinment => isEqual(date, appoinment.date))

    return findAppointment || null
  }

  public create({ provider, date }: CreateAppointmentDTO): Appoinment {
    const appointment = new Appoinment({ provider, date });
    this.appointments.push(appointment)

    return appointment
  }

}

export default AppoinmentsRepository
