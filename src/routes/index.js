
const { Router } = require('express');
const  ContenedorMongo  = require('../../containers/contacto.js');

const router = Router();

let msg = false;
let busqueda = []

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
    dni: String
});

router.get('/', async (req, res) => {
   try {
    
    const contacts = await contactoMongo.findAll();
    busqueda = contacts;
    //console.log(contacts)
    //res.render('index', { contacts })
    //res.send(contacts)
    res.render('index')
   } catch (error) {
    
   }
})

router.get('/admin', async (req, res ) => {
    try {
        res.render('admin')
    } catch (error) {
        throw new Error(error)
    }
})

router.post('/new-contact', async(req, res) => {
    const {firstname, lastname, email, dni} = req.body

    if(busqueda.length == 0) {
        const contacts = await contactoMongo.findAll();
        busqueda = contacts;
    } else {
        try {
            if(dni == '' ) {
                res.render('error');
            } else {
                const found = await busqueda.find((element) => element.dni === dni)
                
                console.log('dni',found)
                if(!found) {
                    let data = await contactoMongo.save(
                        {
                            firstname: firstname, 
                            lastname : lastname, 
                            email    : email, 
                            dni    : dni
                        });
            
                       // console.log(data)
            
                        // if (typeof document !== 'undefined') {
                        //     document.getElementById('loadform').reset();
                           
                        // } else {
                        //     console.log('algo salio mal')
                            
                        //     console.log(firstname, lastname, email, dni)
                        // }
                        res.render('registrado', msg)
                } else {
                    res.render('duplicado')
                }
                
            }
            
            // res.send(data)
            
        } catch (error) {
            throw new Error(error);
        }
        
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