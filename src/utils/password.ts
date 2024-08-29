import bcrypt from 'bcrypt';
import config from 'config';

const rounds = config.get<number>('roundFactors');

const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(rounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}

const compare = async (candidatePassword: string, storedPassword: string) => {
    const authorized = await bcrypt.compare(candidatePassword, storedPassword)
    return authorized;
}

export { hash, compare };

