const Client = require('./client')

class Artwork {
        constructor({id, clientId, title, description, tools, thumbnail, image, link, category, createdDate}){
            this.id = id
            this.clientId = clientId
            this.title = title
            this.description = description
            this.tools = tools
            this.thumbnail = thumbnail
            this.image = image
            this.link = link
            this.category = category // realism / children / cartoon / vectorial / sculpture / painting / drawing
            this.createdDate = createdDate
        }
}

module.exports = Artwork