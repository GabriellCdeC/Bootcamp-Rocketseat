import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointement'
import AppointementsRepository from '../repositores/AppointementsRepository'



interface Request{
    date: Date,
    provider_id: string,
}

class createAppointmentService {

    public async execute({ date, provider_id} : Request): Promise<Appointment> {
        const appointementsRepository = getCustomRepository(AppointementsRepository)

        const appointementDate = startOfHour(date)
        const findAppointmentInSameDate = await appointementsRepository.findByDate(appointementDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointement is already in use.')
        }

        const appointement = appointementsRepository.create({
            provider_id,
            date: appointementDate,

        })

        await appointementsRepository.save(appointement)

        return appointement
    }
    
}

export default  createAppointmentService