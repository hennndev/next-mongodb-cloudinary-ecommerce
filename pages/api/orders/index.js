import clientPromise from "lib/mongodb";
import { v4 as uuid } from 'uuid'


export default async function handler(req, res) {
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { email, name, address, phoneNumber, city, paymentMethod, data } = req.body
        const newOrder = {
            createdAt: new Date(),
            order_id: uuid(),
            email,
            name,
            address, 
            phoneNumber,
            city,
            paymentMethod,
            data,
            status: 'pending'
        }

        await db.collection('orders').insertOne(newOrder)
        res.status(201).json({message: 'Success added new order', data: newOrder})
    }

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const allOrders = await db.collection('orders').find({}).toArray()
        res.status(200).json({message: 'Success get data orders', data: allOrders})
    }
}