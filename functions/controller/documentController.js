const Ride = require('../model/Ride.js');
const User = require('../model/User.js');
const mongoose = require('mongoose');
require('dotenv').config();
const { connection } = require('../db.js');
const { GridFSBucket, ObjectId } = require('mongodb');
const axios = require('axios');
const GOOGLE_MAPS_API_KEY=process.env.GOOGLE_MAPS_API_KEY

const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');


const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const userId = req.user.id; 
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: `${Date.now()}-profile-${userId}`,
          bucketName: 'uploads', 
        };
        resolve(fileInfo);
      });
    },
  });
  
  const upload = multer({ storage }).single('profilePicture');



async function PostProfilePicture(req, res) {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newFileIdentifier = req.file.filename; 

        if (user.profilePictureUrl) {
            const db = mongoose.connection.db;
            const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
            try {
                const oldFileIdentifier = user.profilePictureUrl;
                const oldFile = await db.collection('uploads.files').findOne({ filename: oldFileIdentifier });
                if (oldFile) {
                    await bucket.delete(oldFile._id); 
                }
            } catch (deleteError) {
                console.error('Error deleting old profile picture:', deleteError);
              
            }
        }

        user.profilePictureUrl = newFileIdentifier;
        await user.save();

        res.json({ message: 'Profile picture updated successfully', fileUrl: newFileIdentifier });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).send('Server Error');
    }
}

async function getProfilePictureUrl(req, res) {
    const userId = req.user.id;

    try {

        const user = await User.findById(userId);
        if (!user || !user.profilePictureUrl) {
            return res.status(404).send('No profile picture found.');
        }

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

   
        const filename = user.profilePictureUrl;


        const file = await db.collection('uploads.files').findOne({ filename: filename });
        if (!file) {
            return res.status(404).send('No file found.');
        }

    
        res.setHeader('Content-Type', 'image/jpeg'); 
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');

        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error serving profile picture:', error);
        res.status(500).send('Server Error');
    }
}

async function getProfilePictureNative(req, res) {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user || !user.profilePictureUrl) {
            return res.status(404).send('No profile picture found.');
        }

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        const filename = user.profilePictureUrl;

        const file = await db.collection('uploads.files').findOne({ filename: filename });
        if (!file) {
            return res.status(404).send('No file found.');
        }
        res.setHeader('Content-Type', file.contentType); 
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');

        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error serving profile picture:', error);
        res.status(500).send('Server Error');
    }
}


module.exports = { getProfilePictureUrl,  PostProfilePicture ,upload, getProfilePictureNative};   
