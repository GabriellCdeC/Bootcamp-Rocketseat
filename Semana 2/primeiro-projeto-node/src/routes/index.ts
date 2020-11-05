import { Router } from 'express'
import appointementsRouter from './appointements.routes'

const routes = Router()

routes.use('/appointements', appointementsRouter)

export default routes
