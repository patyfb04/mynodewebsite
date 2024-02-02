const ICrud = require("./interfaces/ICrud");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const config_dev = require("./config.json");
const config_prod = require("./config.prod.json");

class PostGresDB extends ICrud {
  constructor() {
    super();
    //db driver
    this._driver = null;

    //tables
    this._user = null;
    this._client = null;
    this._artwork = null;
    this._book = null;
    this._bookDeliverable = null;
    this._bookPaymentBalance = null;
    this._contact = null;
    this._service = null;
    this._testimonial = null;
    this._home = null;

    this.entities = {
      user: this._user,
      client: this._client,
      artwork: this._artwork,
      book: this._book,
      bookDeliverable: this._bookDeliverable,
      bookPaymentBalance: this._bookPaymentBalance,
      contact: this._contact,
      service: this._service,
      testimonial: this.testimonial,
      home: this.home,
    };
  }

  async create(entityName, item) {
    const { dataValues } = await this.entities[entityName].create(item);
    return dataValues;
  }

  async read(entityName, item = {}) {
    let params = [];
    for (let prop in Object.getOwnPropertyNames(item)) {
      let propName = Object.getOwnPropertyNames(item)[prop];
      let paramObj = {};
      paramObj[propName] =
        propName == "id" ? parseInt(item[propName]) : item[propName];
      params.push(paramObj);
    }

    return await this.entities[entityName].findAll({
      where: {
        [Op.and]: params,
      },
      raw: true,
    });
  }

  async update(entityName, query, item) {
    let params = [];
    for (let prop in Object.getOwnPropertyNames(query)) {
      let propName = Object.getOwnPropertyNames(query)[prop];
      let paramObj = {};
      paramObj[propName] = item[propName];

      params.push(paramObj);
    }

    delete item.id;
    return await this.entities[entityName].update(item, {
      where: {
        [Op.and]: params,
      },
      raw: true,
    });
  }

  async delete(entityName, query) {
    let params = [];
    for (let prop in Object.getOwnPropertyNames(query)) {
      let propName = Object.getOwnPropertyNames(query)[prop];
      let paramObj = {};
      paramObj[propName] =
        propName == "id" ? parseInt(query[propName]) : query[propName];

      params.push(paramObj);
    }

    const result = await this.entities[entityName].destroy({
      where: {
        [Op.and]: params,
      },
      raw: true,
    });

    return result;
  }

  async isConnected() {
    try {
      console.log("connected");
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("not connected");
      console.log("fail to connect");
      return false;
    }
  }

  async connect() {
    let conf = process.argv[2].split("=")[1];

    if (conf == "prod") {
      this._driver = new Sequelize(
        config_prod.database,
        config_prod.user,
        config_prod.password,
        {
          host: config_prod.host,
          dialect: "postgres",
          quoteIdentifiers: true,
          operatorsAlieases: false,
          protocol: "postgres",
          dialectOptions: {
            app: "psql",
            ssl: { rejectUnauthorized: false },
          },
        }
      );
    } else {
      this._driver = new Sequelize(
        config_dev.database,
        config_dev.user,
        config_dev.password,
        {
          host: config_dev.host,
          dialect: "postgres",
          quoteIdentifiers: true,
          operatorsAlieases: false,
        }
      );
    }
    await this.defineModels();
  }

  async defineModels() {
    //HOME
    this._home = this._driver.define(
      "home",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        img1: {
          type: Sequelize.STRING,
          required: false,
        },
        img2: {
          type: Sequelize.STRING,
          required: false,
        },
        img3: {
          type: Sequelize.STRING,
          required: false,
        },
        img4: {
          type: Sequelize.STRING,
          required: false,
        },
        img5: {
          type: Sequelize.STRING,
          required: false,
        },
        link1: {
          type: Sequelize.STRING,
          required: false,
        },
        link2: {
          type: Sequelize.STRING,
          required: false,
        },
        link3: {
          type: Sequelize.STRING,
          required: false,
        },
        link4: {
          type: Sequelize.STRING,
          required: false,
        },
        link5: {
          type: Sequelize.STRING,
          required: false,
        },
        txt1: {
          type: Sequelize.STRING,
          required: false,
        },
        txt2: {
          type: Sequelize.STRING,
          required: false,
        },
        txt3: {
          type: Sequelize.STRING,
          required: false,
        },
        txt4: {
          type: Sequelize.STRING,
          required: false,
        },
        txt5: {
          type: Sequelize.STRING,
          required: false,
        },
      },
      {
        tableName: "home",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._home.sync();

    //USER
    this._user = this._driver.define(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        login: {
          type: Sequelize.STRING,
          required: true,
        },
        password: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "user",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._user.sync();

    //CLIENT
    this._client = this._driver.define(
      "client",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        email: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        active: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        tableName: "client",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._client.sync();

    // ARTWORK
    this._artwork = this._driver.define(
      "artwork",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        title: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        link: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        thumbnail: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        image: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        description: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        tools: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        category: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        createdDate: {
          type: Sequelize.DATE,
          required: true,
        },
        totalPaid: {
          type: Sequelize.DOUBLE,
        },
        display: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        tableName: "artwork",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._artwork.sync();

    //BOOK
    this._book = this._driver.define(
      "book",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        title: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
        link: {
          type: Sequelize.STRING,
          length: 255,
        },
        thumbnail: {
          type: Sequelize.STRING,
          length: 255,
        },
        status: {
          type: Sequelize.STRING,
          required: true,
          length: 255,
        },
      },
      {
        tableName: "book",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._book.sync();

    //BOOK Deliverable
    this._bookDeliverable = this._driver.define(
      "bookDeliverable",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        bookId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        description: {
          type: Sequelize.STRING,
          required: true,
        },
        status: {
          type: Sequelize.STRING,
          length: 255,
        },
        link: {
          type: Sequelize.STRING,
          length: 255,
        },
        amount: {
          type: Sequelize.DOUBLE,
          required: true,
        },
        modifiedDate: {
          type: Sequelize.DATE,
          required: true,
        },
      },
      {
        tableName: "bookDeliverable",
        freezeTableName: false,
        timestamps: false,
      }
    );

    //BOOK Payment
    this._bookPaymentBalance = this._driver.define(
      "bookPaymentBalance",
      {
        id: {
          type: Sequelize.BIGINT,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        bookId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        modifiedDate: {
          type: Sequelize.DATE,
        },
        totalAmountPaid: {
          type: Sequelize.DOUBLE,
          required: true,
        },
      },
      {
        tableName: "bookPaymentBalance",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this._bookPaymentBalance.sync();

    //CONTACT
    this._contact = this._driver.define(
      "contact",
      {
        id: {
          type: Sequelize.BIGINT,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "contact",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._contact.sync();

    //SERVICE
    this._service = this._driver.define(
      "service",
      {
        id: {
          type: Sequelize.BIGINT,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "service",
        freezeTableName: false,
        timestamps: false,
      }
    );
    await this._service.sync();

    // TESTIMONIAL
    this._testimonial = this._driver.define(
      "testimonial",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        author: {
          type: Sequelize.STRING,
          required: true,
        },
        comment: {
          type: Sequelize.STRING,
          required: true,
        },
        display: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        tableName: "testimonial",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this._testimonial.sync();

    this.entities = {
      user: this._user,
      client: this._client,
      artwork: this._artwork,
      book: this._book,
      bookDeliverable: this._bookDeliverable,
      bookPaymentBalance: this._bookPaymentBalance,
      contact: this._contact,
      service: this._service,
      testimonial: this._testimonial,
      home: this._home
    };
  }
}

module.exports = PostGresDB;
