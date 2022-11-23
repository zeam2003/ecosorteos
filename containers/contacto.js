import mongoose from "mongoose";
import config from '../config.js'

await mongoose.connect(config.mongoDB.uri, config.mongoDB.options);

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

export default ContenedorMongo;