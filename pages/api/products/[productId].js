
import clientPromise from '../../../lib/mongodb'
const cloudinary = require('cloudinary').v2
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {


    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { createdAt, name, price, description, image, status, checkImg } = req.body
        const { productId } = req.query
        const updateProduct = {
            createdAt,
            name, 
            price, 
            description, 
            image,
            status,
            count: 1,
        }
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
        });


        if(checkImg) {
            await db.collection('products').replaceOne({"_id": ObjectId(productId)}, {...updateProduct})
            res.status(200).json({message: 'Success update product', data: updateProduct})
        } else {
            cloudinary.uploader.destroy(req.body.oldImageId, function(error, result) { })
            await db.collection('products').replaceOne({"_id": ObjectId(productId)}, {...updateProduct})
            res.status(200).json({message: 'Success update product', data: updateProduct})
        }
    }   

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const { productId } = req.query
        const product = await db.collection('products').findOne(ObjectId(productId))
        res.status(200).json({message: 'Success get data product', data: product})
    }
}