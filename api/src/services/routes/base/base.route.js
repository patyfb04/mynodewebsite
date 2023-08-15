var fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: "AKIAVSNCYTOJI3D6NSWW",
    secretAccessKey: "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",
    });

const BUCKET = 'pb-images-bucket'

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

                const newPath = path.resolve(__dirname, "../../../../images/" + request.files.file.originalFilename)

                fs.rename(request.files.file.path, newPath, function (err) {
                    if (err) throw err;
                    console.log('File Renamed.', newPath);
                });

                console.log('newPath =>', newPath)
                const file = fs.readFileSync(newPath)
                const fileName = request.files.file.originalFilename;

                const uploadParamsFile = {
                    Bucket: BUCKET,
                    Key: fileName,
                    Body: file
                    };

                let uploaded_file = false
                s3.upload(uploadParamsFile, function (err, data) 
                {
                    if (err) {
                        console.log('error uploading file')
                    }
                    if (data) 
                    {
                        console.log('uploaded file')
                    }
                }) 

                if(request.files.file_thumbnail != null) 
                {
                    console.log('FILE THUMB =>', request.files.file_thumbnail)
                    console.log('FILE THUMB NAME=>', request.files.file_thumbnail.originalFilename)
   
                    const newThumbnailPath = path.resolve(__dirname, "../../../../images/" + request.files.file_thumbnail.originalFilename)

                    fs.rename(request.files.file_thumbnail.path, newThumbnailPath, function (err) {
                        if (err) throw err;
                        console.log('Thumbnail File Renamed.', newThumbnailPath);
                    })

                    const fileThumb = fs.readFileSync(newPath)
                    const fileThumbName =  request.files.file_thumbnail.originalFilename;

                    const uploadParamsFileThumb = {
                        Bucket: BUCKET,
                        Key: fileThumbName,
                        Body: fileThumb
                        };

                    s3.upload(uploadParamsFileThumb, function (err, data) 
                    {
                        if (err) {
                            console.log('error uploading thumbnail')
                        }
                        if (data) 
                        {
                            console.log('uploaded thumbnail')
                        }
                    })
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