var multer = require('multer');
var fs = require('fs');
var busboy = require('connect-busboy');

const upload = multer({ dest: './assets/books/' }).single('thumbnail');

class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }

    list(entityName) {
        return {
            path: '/' + entityName + 's',
            method: 'GET',
            handler: (request, headers) => {
                console.log('LIST ' + entityName, request.params)
                return this.db.read(entityName)
            }
        }
    }

    get(entityName) {
        return {
            path: '/' + entityName + '/:id',
            method: 'GET',
            handler: (request, headers) => {
                console.log('GET ' + entityName, request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }


    create(entityName) {
        return {
            path: '/' + entityName + '/create',
            method: 'POST',
            handler: (request, headers) => {
                console.log('CREATE ' + entityName, request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update(entityName) {
        return {
            path: '/' + entityName + '/update',
            method: 'POST',
            handler: (request, headers) => {
                const id = { id: request.body.id }
                console.log('UPDATE ' + entityName, { id: id }, request.body)
                return this.db.update(this.entityName, id, request.body)
            }
        }
    }

    delete(entityName) {
        return {
            path: '/' + entityName + '/delete',
            method: 'POST',
            handler: (request, response) => {
                const id = { id: request.body.id }
                console.log('DELETE ' + entityName, id, request.body)
                this.db.delete(this.entityName, id, request.body)
                return new Promise((resolve, reject) => {
                    resolve(1);
                  })
            }
        }
    }

    upload(entityName) {
        return {
            path: '/' + entityName + '/upload',
            method: 'POST',
            handler: (request, response) => {

                console.log(request)
               if (!request.files) {
                   console.log('==> NO FILES WERE UPLOADED')
               }
               
               var fstream;
               request.pipe(request.busboy);
               request.busboy.on('file', function (fieldname, file, filename) {
                   console.log("Uploading: " + filename);
                   fstream = fs.createWriteStream(__dirname + '/assets/books/' + filename);
                   file.pipe(fstream);
                   fstream.on('close', function () {
                         return new Promise((resolve, reject) => {
                                resolve(1);
                              })
                   });
               });


                // upload(request, response,function(err) {

                //     if(err) {
                //         console.log('==> UPLOAD ERROR', err)
                //         return new Promise((resolve, reject) => {
                //             resolve(0);
                //           })
                //     }
                //     console.log('==> UPLOADED')
                //     return new Promise((resolve, reject) => {
                //         resolve(1);
                //       })
                // });

                return new Promise((resolve, reject) => {
                    resolve(1);
                  })
            }
        }
    }
}

module.exports = BaseRoute