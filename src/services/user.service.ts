import { myDataSource } from "../db";
import { User } from "../entity/user.entity";


class UserService {
    public userRepository = myDataSource.getRepository(User);
    // findByEmail = async (email: string) => {
    //     return await this.userRepository.findOneBy({
    //         email,
    //     })
    // }
    create = async (input: Partial<User>) => {
        return await this.userRepository.save(this.userRepository.create(input));
    }

    update = async (id: number, user: User) => {
        return this.userRepository.update(id, user)
    }

    findUserByEmail = async ({ email }: { email: string }) => {
        return await this.userRepository.findOneBy({
            email,
        })
    }

    findUserByRefreshToken = async ({ refreshToken }: { refreshToken: string }) => {
        return await this.userRepository.findOneBy({
            refreshToken,
        })
    }
}

export default new UserService();