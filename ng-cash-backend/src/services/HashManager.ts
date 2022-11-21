import bcrypt from 'bcryptjs';

export class HashManager {
	hash = async (password: string) => {
		const rounds = Number(process.env.HASH_ROUNDS);
		const salt = await bcrypt.genSalt(rounds);

		return await bcrypt.hash(password, salt);
	};

    verify = async(password: string, hashPassword: string):Promise <boolean> => {
        return await bcrypt.compare(password, hashPassword)
    }
}
