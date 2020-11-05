import Appointement from '../models/Appointement'
import {isEqual} from 'date-fns'

//Data Transfer Object - DTO

interface createAppointmentDTO{
  provider: string,
  date: Date
}

class AppointementsRepository{
  private appointements: Appointement[]

  constructor(){
    this.appointements = []
  }

  public all(): Appointement[]{
    return this.appointements
  }

  public create({provider, date} : createAppointmentDTO) : Appointement{
    const appointement = new Appointement({provider, date})

    this.appointements.push(appointement)

    return appointement
  }

  public findByDate(date: Date) : Appointement | null {
    const findAppointment = this.appointements.find(appointement => isEqual(date, appointement.date))

    return findAppointment || null
  }
}

export default AppointementsRepository
