var fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const config_prod = require('./../../../database/strategies/config.prod.json')
// const AWS = require('aws-sdk')


// const BUCKET = 'pb-images-bucket'

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

                console.log('FILE =>', request.files.file)
                console.log('FILE NAME =>', request.files.file.originalFilename)
                console.log('Dirname =>', __dirname)

                let conf = process.argv[2].split('=')[1]

                const newPath = conf != "prod" ? 'images\\': "\\opt\\render\\project\\src\\api\\data\\images\\"

                fs.rename(request.files.file.path, newPath, function (err) {
                    if (err) throw err;
                    console.log('File Renamed.', newPath);
                });

                console.log('newPath =>', newPath)
                const file = fs.readFileSync(newPath)
                const fileName = request.files.file.originalFilename;

                // let s3 = new AWS.S3({
                //     accessKeyId: config_prod.accessKeyId,
                //     secretAccessKey: config_prod.secretAccessKey,
                //  })
                // const uploadParamsFile = {
                //     Bucket: BUCKET,
                //     Key: fileName,
                //     Body: file
                //     };

                // let uploaded_file = false
                // s3.upload(uploadParamsFile, function (err, data) 
                // {
                //     if (err) {
                //         console.log('error uploading file')
                //     }
                //     if (data) 
                //     {
                //         console.log('uploaded file')
                //     }
                // }) 

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
                    service: 'gmail',
                    auth: {
                      user: 'patyartworks@gmail.com',
                      pass: 'sspipbaswxjoeejz'
                    }
                })

                var message = {
                    from: request.body.email,
                    to: "patyartworks@gmail.com",
                    subject: "Patricia Braga - Contact Form : " + request.body.name,
                    text:  request.body.message
            }
                return transport.sendMail(message)
            }
        }
    }
}

module.exports = BaseRoute