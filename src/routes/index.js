
const { Router } = require('express');
const  ContenedorMongo  = require('../../containers/contacto.js');

const router = Router();

// (async () => {
//     try {
//        await mongoose.connect(mongoC.mongoDB.uri, mongoC.mongoDB.options);
//     } catch (error) {
//         console.log('No se pudo conectar a la base de datos')
//     }

    

// })();


const contactoMongo = new ContenedorMongo('contacts',{
    firstname: String,
    lastname: String,
    email: String,
    phone: String
});

router.get('/', async (req, res) => {
   try {
    const contacts = await contactoMongo.findAll();
    //console.log(contacts)
    //res.render('index', { contacts })
    //res.send(contacts)
    res.render('index')
   } catch (error) {
    
   }
})

router.post('/new-contact', async(req, res) => {
    const {firstname, lastname, email, phone} = req.body
    
    try {
        const data = await contactoMongo.save(
            {
                firstname: firstname, 
                lastname : lastname, 
                email    : email, 
                phone    : phone
            });
        res.send(data)
    } catch (error) {
        throw new Error(error);
    }
    

})
/* 
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
 */

module.exports = router;