const {Router} = require('express');
const {db} = require('../firebase.js')
const router = Router();

router.get('/', async(req, res) => {
    try {
            const querySnapshot = await db.collection('contacts').get();
            const contacts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            phone: doc.data().phone
        }))
        console.log(contacts)
        res.render('index', { contacts })
    } catch (error) {
        console.log('error!!!')
    }
    
});


module.exports = router;