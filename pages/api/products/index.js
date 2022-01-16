
import clientPromise from "lib/mongodb"
import { ObjectId } from 'mongodb'
const cloudinary = require('cloudinary').v2

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { name, price, description, image } = req.body
        const newProduct = {
            createdAt: new Date(),
            name, 
            price, 
            description, 
            image,
            status: 'available',
            count: 1,
        }
        await db.collection('products').insertOne(newProduct)
        res.status(201).json({message: 'Success create new product', data: newProduct})
    } 
    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const data = await db.collection('products').find({}).toArray()
        res.status(200).json({message: 'Success get data from database', data})
    }
    

    
    if(req.method === 'DELETE') {
        const client = await clientPromise
        const db = client.db()
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
          });
        
        await db.collection('products').remove({_id: ObjectId(req.query.productId)})

        cloudinary.uploader.destroy(req.query.imageId, function(error, result) { })

    }
}