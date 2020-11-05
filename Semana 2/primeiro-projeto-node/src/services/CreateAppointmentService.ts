import { startOfHour } from 'date-fns'

import Appointement from '../models/Appointement'
import AppointementsRepository from '../repositores/AppointementsRepository'

interface Request{
    date: Date,
    provider: string,
}

class createAppointmentService {

    private appointementsRepository: AppointementsRepository

    constructor(appointementsRepository: AppointementsRepository){
        this.appointementsRepository = appointementsRepository
    }

    public execute({ date, provider} : Request): Appointement {
        const appointementDate = startOfHour(date)
        const findAppointmentInSameDate = this.appointementsRepository.findByDate(appointementDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointement is already in use.')
        }

        const appointement = this.appointementsRepository.create({
            provider,
            date: appointementDate,

        })

        return appointement
    }
    
}

export default  createAppointmentService