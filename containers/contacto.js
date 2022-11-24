
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

    findByid(id) {

    }

    async findAll() {
        try {
          const data = await this.db.find({});
          return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async save(newDoc) {
        try {
          const doc = await this.db.create(newDoc)  
          return doc;
        } catch (error) {
            throw new Error(error);
        }
    }

    update(elem) {

    }

    delete(elem) {

    }

    delteAll() {

    }

}

module.exports = ContenedorMongo;