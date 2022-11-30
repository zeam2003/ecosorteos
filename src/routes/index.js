
const { Router } = require('express');
const  ContenedorMongo  = require('../../containers/contacto.js');

const router = Router();

let msg = false;
let busqueda = [];
let sorteados = [];
let firstListener = '';

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

const contenedorSorteados = new ContenedorMongo('sorteados',{
    firstname: String,
    lastname: String,
    email: String,
    dni: String
});

const comoSorterar = () => {
    console.log('como sortear')
}

router.get('/', async (req, res) => {
   try {
    
    const contacts = await contactoMongo.findAll();
    busqueda = contacts;
    console.log('traigo contactos')
    //console.log(contacts)
    //res.render('index', { contacts })
    //res.send(contacts)
    res.render('index')
   } catch (error) {
    
   }
})

router.get('/all', async (req, res) => {
    try {
     
     const contacts = await contactoMongo.findAll();
     busqueda = contacts;
     //console.log(contacts)
     //res.render('index', { contacts })
     //res.send(contacts)
     res.send(contacts)
    } catch (error) {
        res.send = {
            status: 503,
            message: 'Algo salio mal'
        }
    }
 })

router.get('/admin', async (req, res ) => {
    
    if(busqueda.length == 0 || sorteados == 0) {
        
        
        
        try {
            const query = await contactoMongo.findAll();
            const contacts = query.map((doc) => ({
                firstname: doc.firstname,
                lastname: doc.lastname,
            }));
            busqueda = query;

            const nuevaQuery = await contenedorSorteados.findAllSorteados();

            const querySorteados = nuevaQuery.map((doc) => ({
                firstname: doc.firstname,
                lastname: doc.lastname
            }));

            sorteados = nuevaQuery;

            res.render('admin', {contacts, querySorteados})
        } catch (error) {
            throw new Error(error)
        }
    } else {
        try {
            const query = await contactoMongo.findAll();
            const contacts = query.map((doc) => ({
            firstname: doc.firstname,
            lastname: doc.lastname
            }))
            busqueda = query;
            const nuevaQuery = await contenedorSorteados.findAllSorteados();
            const querySorteados = nuevaQuery.map((doc) => ({
                firstname: doc.firstname,
                lastname: doc.lastname
            }));

            //console.log('en el else de admin', querySorteados)
            res.render('admin',{contacts, querySorteados})
        } catch (error) {
            console.log(error)
        }
        
    }
    
})

router.get('/sorteo', async(req, res ) => {
    res.render('sorteo')
})

router.post('/sorteado', async(req, res) => {
    const {firstname, lastname, email, dni} = req.body
    try {
        let data = await contenedorSorteados.save(
            {
                firstname: firstname, 
                lastname : lastname, 
                email    : email, 
                dni    : dni
            });

        
            res.send('sorteado guardado')
    } catch (error) {
        console.log(error)
    }
    
})
router.delete('/delete-contact/:id', async(req, res) => {
    const { id } = req.params;

    try {
        let data = await contactoMongo.deleteByDni(id)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/new-contact', async(req, res) => {
    const {firstname, lastname, email, dni} = req.body

    if(busqueda.length == 0) {
            try {
                const contacts = await contactoMongo.findAll();
                busqueda = contacts;
                console.log('busqueda antes de guardar', busqueda.length)
                let data = await contactoMongo.save(
                    {
                        firstname: firstname, 
                        lastname : lastname, 
                        email    : email, 
                        dni    : dni
                    });
        
                    res.render('registrado', msg)
            } catch (error) {
                
            }
       
    } else {
        try {
            if(dni == '' ) {
                res.render('error');
            } else {
                const found = await busqueda.find((element) => element.dni === dni)
                
                //console.log('dni',found)
                if(!found) {
                    console.log('estoy aca')
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



module.exports = router;