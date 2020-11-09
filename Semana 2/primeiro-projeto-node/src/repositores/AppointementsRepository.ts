import { EntityRepository, Repository } from 'typeorm'

import Appointement from '../models/Appointement'

//Data Transfer Object - DTO
@EntityRepository(Appointement)
class AppointementsRepository extends Repository<Appointement> {

  public async findByDate(date: Date): Promise<Appointement | null> {
    
    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null
  }
}

export default AppointementsRepository
