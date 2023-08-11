var fs = require('fs');
const nodemailer = require('nodemailer')

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
                console.log('DATA =>', request.files.file)
                console.log('DATA THUMB =>', request.files.file_thumbnail)

                let conf = process.argv[2].split('=')[1]
                let img_path = conf == "prod" ? 'images\\' : "images\\"

                const path = img_path
                const newPath = path +""+ request.files.file.originalFilename;
                
                fs.rename(request.files.file.path, newPath, function (err) {
                    if (err) throw err;
                    console.log('File Renamed.', newPath);
                });

                if(request.files.file_thumbnail != null) 
                {
                    const newThumbnailPath = path +""+ request.files.file_thumbnail.originalFilename;
                    fs.rename(request.files.file_thumbnail.path, newThumbnailPath, function (err) {
                        if (err) throw err;
                        console.log('Thumbnail File Renamed.', newThumbnailPath);
                    });
                }

                return new Promise((resolve, reject) => {
                    resolve(1);
                })
            }
        }
    }

    sendEmail() {
        console.log('send email')
        return {
            path: '/sendForm',
            method: 'POST',
            handler: (request, response) => {
                console.log('Message =>',  request.body)

                var transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                    user: "e21f178f268a87",
                    pass: "b5c9ab295b570a"
                    }
                })

                var message = {
                    from: request.body.email,
                    to: "patyfb04@gmail.com",
                    subject: "Patricia Braga - Contact Form from " + request.body.name,
                    text:  request.body.message
            }
                return transport.sendMail(message)
            }
        }
    }
}

module.exports = BaseRoute