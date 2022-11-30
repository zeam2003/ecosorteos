
const { mongoose } = require('mongoose');
const  config  = require('../config.js');


// (async () => {
//     try {
//        await mongoose.connect(mongoC.mongoDB.uri, mongoC.mongoDB.options);
//     } catch (error) {
//         console.log('No se pudo conectar a la base de datos')
//     }

    

// })();
(async () => {
    try {
        await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
    } catch (error) {
        throw new Error(error);
    }
})();



 class ContenedorMongo {

    // se debe recibir la coleccion y esquema
    constructor(coleccion, esquema) {
        this.db = mongoose.model(coleccion, esquema);
    }

   async findByDni(dni) {
        try {
            const data = await this.db.find((persona) => persona.dni == dni);
            if(persona) {
                return data
            } 
        } catch(error) {
            throw new Error(error)
        }
    }

    async findAll() {
        try {
          const data = await this.db.find({});
          return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllSorteados() {
        try {
            const data = await this.db.find({});
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async save(newDoc) {
        try {
            const doc = await this.db.create(newDoc)  
            //console.log('Se creo el documento', doc);
            return doc
        } catch (error) {
            throw new Error(error);
        }
    }

    update(elem) {

    }

    async deleteByDni(id) {
        try {
            const borrar = await this.db.deleteOne({_id: id})
            return borrar
        } catch (error) {
            console.log(error)
        }
    }

    delteAll() {

    }

}

module.exports = ContenedorMongo;