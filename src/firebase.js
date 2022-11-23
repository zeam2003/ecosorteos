const admin  = require('firebase-admin');
const {getFirestore} = require('firebase-admin/firestore')
const FirebaseDetails = require('../config.js')


    admin.initializeApp({
        credential: admin.credential.cert(FirebaseDetails),
        databaseURL: 'https://firebase-adminsdk-q0iib@ecosorteos-31d17.iam.gserviceaccount.com'
    })


const db = getFirestore();

module.exports = {
    db,
}