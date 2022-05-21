const ICrud = require('./interfaces/ICrud')
const Sequelize = require('sequelize')
const { Op } = require("sequelize")

class PostGresDB extends ICrud {
    constructor() {
        super()
        //db driver
        this._driver = null

        //tables
        this._user = null
        this._client = null
        this._artwork = null
        this._book = null
        this._bookDeliverable = null
        this._bookPaymentBalance = null

        this.entities = {
            user : this._user,
            client : this._client,
            artwork : this._artwork,
            book : this._book,
            bookDeliverable : this._bookDeliverable,
            bookPaymentBalance: this._bookPaymentBalance
        }
    }

    async create(entityName, item) {
        const {dataValues} =  await this.entities[entityName].create(item)
        return dataValues
    }

    async read(entityName, item = {}) {
        let params = []
        for (let prop in Object.getOwnPropertyNames(item)) {
            let propName = Object.getOwnPropertyNames(item)[prop]
            let paramObj = {}
            paramObj[propName] = item[propName]
            params.push(paramObj);
        }

        return  await this.entities[entityName].findAll({
                where: {
                 [Op.and]: params 
                }, raw:true})
    }

    async update(entityName, query, item) {

        let params = []
        for (let prop in Object.getOwnPropertyNames(query)) {
            let propName = Object.getOwnPropertyNames(query)[prop]
            let paramObj = {}
            paramObj[propName] = item[propName]

            params.push(paramObj);
        }
        
        delete item.id
        return  await this.entities[entityName].update(item, { 
            where: {
             [Op.and]: params  
            }, raw:true})
    }

    async delete(entityName, query) {

        let params = []
        for (let prop in Object.getOwnPropertyNames(query)) {
            let propName = Object.getOwnPropertyNames(query)[prop]
            let paramObj = {}
            paramObj[propName] = query[propName]

            params.push(paramObj);
        }

        const result = await this.entities[entityName].destroy( { 
            where: {
             [Op.and]: params  
            }, raw:true})

        return result
    }

    async isConnected() {
        try {
            console.log('connected')
            await this._driver.authenticate()
            return true
        }
        catch (error) {
            console.log('not connected')
            console.log('fail to connect')
            return false
        }
    }

    async connect() {
    this._driver = new Sequelize(
            'patriciaDB',
            'postgres',
            '123456',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: true,
                operatorsAlieases: false
            }
        )

       await this.defineModels()
    }

    async defineModels() {

        //USER
        this._user = this._driver.define('user', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                type: Sequelize.STRING,
                required: true
            },
            password: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'user',
            freezeTableName: false,
            timestamps: false
        })
        await this._user.sync()

        //CLIENT
        this._client = this._driver.define('client', 
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                email: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                active: {
                    type: Sequelize.BOOLEAN
                  }
            }, {
                tableName: 'client',
                freezeTableName: false,
                timestamps: false
            })
        await this._client.sync()

        // ARTWORK
        this._artwork = this._driver.define('artwork', 
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                clientId: {
                    type: Sequelize.INTEGER,
                    required: true
                },
                title: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                link: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                thumbnail: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                image: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                description: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                tools: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                category: {
                    type: Sequelize.STRING,
                    required: true,
                    length: 255
                },
                createdDate: {
                    type: Sequelize.DATE,
                    required: true
                },
              
            }, {
                tableName: 'artwork',
                freezeTableName: false,
                timestamps: false
            })
        await this._artwork.sync()

        //BOOK
        this._book = this._driver.define('book',  {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            clientId: {
                type: Sequelize.INTEGER,
                required: true
            },
            title: {
                type: Sequelize.STRING,
                required: true,
                length:255
            },
            link: {
                type: Sequelize.STRING,
                length:255
            },
            thumbnail: {
                type: Sequelize.STRING,
                length:255
            },
            status: {
                type: Sequelize.STRING,
                required: true,
                length:255
            }
        }, {
            tableName: 'book',
            freezeTableName: false,
            timestamps: false
        })
        await this._book.sync()

       //BOOK Deliverable
        this._bookDeliverable = this._driver.define('bookDeliverable',  {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            bookId: {
                type: Sequelize.INTEGER,
                required: true
            },
            description: {
                type: Sequelize.STRING,
                required: true
            },
            status: {
                type: Sequelize.STRING,
                length:255
            },
            link: {
                type: Sequelize.STRING,
                length:255
            },
            amount: {
                type: Sequelize.DOUBLE,
                required: true
            },
            modifiedDate: {
                type: Sequelize.DATE,
                required: true
            }
        }, {
            tableName: 'bookDeliverable',
            freezeTableName: false,
            timestamps: false
        }) 

        //BOOK Payment
          this._bookPaymentBalance = this._driver.define('bookPaymentBalance', {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                bookId: {
                    type: Sequelize.INTEGER,
                    required: true
                },
                modifiedDate: {
                    type: Sequelize.DATE
                },
                totalAmountPaid: {
                    type: Sequelize.DOUBLE,
                    required: true
                }
            }, {
                tableName: 'bookPaymentBalance',
                freezeTableName: false,
                timestamps: false
            } )
  
        await this._bookPaymentBalance.sync()

        this.entities = {
            user : this._user,
            client : this._client,
            artwork : this._artwork,
            book : this._book,
            bookDeliverable : this._bookDeliverable,
            bookPaymentBalance: this._bookPaymentBalance
        }
    }

}

module.exports = PostGresDB