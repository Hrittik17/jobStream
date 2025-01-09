import bcrypt from 'bcryptjs';

export async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }catch(error){
        console.error(error)
        throw new Error('Could not hash password')
    }
}

export async function checkSamePassword(password,hashedPassword){
    try{
        const isPasswordSame = await bcrypt.compare(password,hashedPassword);
        return isPasswordSame;
    }catch(err){
        console.error(err)
        throw new Error(err)
    }
}