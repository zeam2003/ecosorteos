const { Router } = require('express');
const  ContenedorMongo  = require('../../containers/contacto.js');

const router = Router();

let msg = false;
let busqueda = [];
let sorteados = [];


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
    res.render('index')
   } catch (error) {
    
   }
})

router.get('/all', async (req, res) => {
    try {
     
     const contacts = await contactoMongo.findAll();
     busqueda = contacts;
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
            query.sort((a,b) => {
                const apellidoA = a.lastname.toLowerCase();
                const apellidoB = b.lastname.toLowerCase();

                if (apellidoA < apellidoB) {
                    return -1;
                }
                if( apellidoA > apellidoB ) {
                    return 1
                }
                return 0;
            });
            
            const contacts = query.map((doc) => ({
                id: doc._id,
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

            query.sort((a,b) => {
                const apellidoA = a.lastname.toLowerCase();
                const apellidoB = b.lastname.toLowerCase();

                if (apellidoA < apellidoB) {
                    return -1;
                }
                if( apellidoA > apellidoB ) {
                    return 1
                }
                return 0;
            });

            const contacts = query.map((doc) => ({
                id: doc._id,
                firstname: doc.firstname,
                lastname: doc.lastname
                }));
            busqueda = query;
            const nuevaQuery = await contenedorSorteados.findAllSorteados();
            const querySorteados = nuevaQuery.map((doc) => ({
                firstname: doc.firstname,
                lastname: doc.lastname
            }));

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

router.post('/new-contact', async(req, res) => {
    const {firstname, lastname, email, dni} = req.body

    if(busqueda.length == 0) {
            try {
                const contacts = await contactoMongo.findAll();
                busqueda = contacts;
                
                let data = await contactoMongo.save(
                    {
                        firstname: firstname, 
                        lastname : lastname, 
                        email    : email, 
                        dni    : dni
                    });
        
                    res.render('registrado', msg)
            } catch (error) {
                throw new Error(error)
            }
       
    } else {
        try {
            if(dni == '' ) {
                res.render('error');
            } else {
                const found = await busqueda.find((element) => element.dni === dni)
                if(!found) {
                    console.log('estoy aca')
                    let data = await contactoMongo.save(
                        {
                            firstname: firstname, 
                            lastname : lastname, 
                            email    : email, 
                            dni    : dni
                        });
                        res.render('registrado', msg)
                } else {
                    res.render('duplicado')
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }
})



router.get('/edit-contact/:id', async(req, res) => {
  const {id} = req.params;
  let contador = 0;
  
  try {
    const participante = await contactoMongo.findById(id) 
    const contacts = participante.map((doc) => ({
        id: doc.id,
        firstname: doc.firstname,
        lastname: doc.lastname,
        email: doc.email,
        dni: doc.dni
    }));
    //console.log(contacts)
    console.log(contador++)
    res.render('edit',{contacts})
    //console.log(doc)
  } catch (error) {
    throw new Error(error)
  }
   

})

router.post('/update-contact/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, dni } = req.body;
    try {
        let data = await contactoMongo.update({'id': id, 'firstname': firstname, 'lastname': lastname, 'email': email, 'dni':dni})
        res.render('actualizado')
    } catch (error) {
        throw new Error(error)
    }

   
})

router.delete('/delete-participante/:id', async(req, res) => {
    const { id } = req.params;

    try {
        let data = await contactoMongo.deleteByDni(id)
        //res.send(data)
        res.send('eliminado')
    } catch (error) {
        console.log(error)
    }
})


router.get('/delete-contact/:id', async(req, res) => {
    const { id } = req.params;

    try {
        let data = await contactoMongo.deleteByDni(id)
        //res.send(data)
        res.render('eliminado')
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;