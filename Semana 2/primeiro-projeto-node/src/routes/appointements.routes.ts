import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns'

import AppointementsRepository from '../repositores/AppointementsRepository'

const appointementsRouter = Router()

const AppointementRepository = new AppointementsRepository();

appointementsRouter.get('/', (request, response) => {
  const appointements = AppointementRepository.all()

  return response.json(appointements)
})

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parsedDate = startOfHour(parseISO(date))

  const findAppointmentInSameDate = AppointementRepository.findByDate(parsedDate)

  if (findAppointmentInSameDate) {
    return response.status(400).json({ error: 'This appointement is already in use.' })
  }

  const appointement = AppointementRepository.create({
    provider,
    date: parsedDate
  })


  return response.json(appointement)
})

export default appointementsRouter
