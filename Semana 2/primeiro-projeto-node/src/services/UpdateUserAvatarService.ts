import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import User from '../models/User'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'


interface Request {
    user_id: string,
    avatar_filename: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatar_filename }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new AppError('You need to be logged in to update an avatar', 401)
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)

            }
        }

        user.avatar = avatar_filename

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService