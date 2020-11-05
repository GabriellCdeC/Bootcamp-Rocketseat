import { Router } from 'express';
import {  parseISO } from 'date-fns'

import AppointementsRepository from '../repositores/AppointementsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointementsRouter = Router()

const AppointementRepository = new AppointementsRepository();

appointementsRouter.get('/', (request, response) => {
  const appointements = AppointementRepository.all()

  return response.json(appointements)
})

appointementsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(AppointementRepository)

  const appointement = createAppointment.execute({date: parsedDate, provider})
  

  return response.json(appointement)
  }catch(err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointementsRouter
