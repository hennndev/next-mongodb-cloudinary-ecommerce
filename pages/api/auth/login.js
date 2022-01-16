
import clientPromise from "lib/mongodb";
import { hash, compare } from 'bcryptjs'

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const { email, password } = req.body 
        const client = await clientPromise

        const db = client.db()

        const checkExistingUser = await db.collection('users').findOne({email: email})
        
        if(checkExistingUser) {
            const checkPassword = await compare(password, checkExistingUser.password)

            if(!checkPassword) {
                res.status(401).json({ message: 'Error, Password incorrect' });
            } else {
                res.status(200).json({message: 'Success, Welcome'})
            }
        } else {
            res.status(401).json({ message: 'Error, Email not yet registered' });
        }
    }
}