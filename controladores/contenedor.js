const fs = require('fs');
const archivoTxt = 'productos.txt';
console.log(archivoTxt);

class Contenedor {

    async save(objeto) {
        try{
            let contenedor = await this.getAll();
                contenedor = JSON.parse(contenedor);
            const max = contenedor.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
                objeto.id = max.id + 1;
                contenedor.push(objeto);
            let json = JSON.stringify(contenedor);
            await fs.promises.writeFile(archivoTxt, json);
                return objeto.id;
        }catch(error){
            console.log(error);
        }
    }

    async getById(id) {
        try{
            let contenedor = await this.getAll();
            contenedor = JSON.parse(contenedor);
            let objeto = contenedor.find(obj => obj.id == id);

            if(objeto!=undefined){
                return objeto;
            }
            else{
                return 'no existe el objeto';
            }
        }catch(error){
            console.log(error);
        }
        
    }

    async getAll() { if (!fs.existsSync(archivoTxt)) {
        fs.promises.writeFile(archivoTxt, '[]');
    }try{
        let dato = await fs.promises.readFile(archivoTxt, 'utf8')
        return dato;
    }catch(error){
        console.log(error);
    }
    }

    async deleteById(id) {
        let contenedor = await this.getAll();
        contenedor = JSON.parse(contenedor);
        let objeto = contenedor.find(obj => obj.id == id);
        contenedor = contenedor.filter(obj => obj.id != id);
        if(objeto!=undefined){
            let json = JSON.stringify(contenedor);
            fs.promises.writeFile(archivoTxt, json);
            console.log('objeto eliminado');}
        else{
            console.log('no existe el objeto');
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(archivoTxt, '[]');
        console.log('todos los objetos fueron eliminados');
    }

    //actualizar
    async update(id, objeto) {
        let contenedor = await this.getAll();
        contenedor = JSON.parse(contenedor);
        let objetoActualizado = contenedor.find(obj => obj.id == id);
        if(objetoActualizado!=undefined){
            objetoActualizado.title = objeto.title;
            objetoActualizado.price = objeto.price;
            let json = JSON.stringify(contenedor);
            fs.promises.writeFile(archivoTxt, json);
            console.log('objeto actualizado');
        }
        else{
            console.log('no existe el objeto');
        }
    }

}

module.exports = {
    save: Contenedor.prototype.save,
    getById: Contenedor.prototype.getById,
    getAll: Contenedor.prototype.getAll,
    deleteById: Contenedor.prototype.deleteById,
    deleteAll: Contenedor.prototype.deleteAll,
    update: Contenedor.prototype.update
}