import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    const client = await clientPromise

    if(req.method === 'POST') {
        const db = client.db()
        const { newStatus } = req.body
        const { orderId } = req.query 


        await db.collection('orders').updateOne({"_id": ObjectId(orderId)}, { $set: { "status" : newStatus }})
        res.status(200).json({message: 'Success update data order', data: {status: 'cancelled'}})
    }

    if(req.method === 'DELETE') {
        const db = client.db()
        const { orderId } = req.query 

        await db.collection('orders').remove({_id: ObjectId(orderId)})
        res.status(200).json({message: 'Success delete order' })
    }
}