import clientPromise from "lib/mongodb";


export default async function handler(req, res) {
    const client = await clientPromise

    if(req.method === 'GET') {
        const db = client.db()
        const dataUsers = await db.collection('users').find({}).toArray()
        res.status(200).json({message: 'Success get data users', data: dataUsers})
    }
}