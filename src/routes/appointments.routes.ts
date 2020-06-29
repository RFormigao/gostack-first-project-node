import { Router } from "express";
import { parseISO } from 'date-fns'

import AppoinmentsRepository from '../repositories/AppoinmentsRepository'
import CreateAppoinmentService from '../services/CreateAppoinmentService'

const appointmentsRouter = Router()
const appoinmentsRepository = new AppoinmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appoinmentsRepository.all()

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parseDate = parseISO(date)
    const createAppoinmentService = new CreateAppoinmentService(appoinmentsRepository)
    const appointment = createAppoinmentService.execute({ date: parseDate, provider })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter;
