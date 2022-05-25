class Artwork {
        constructor({id, clientId, title, description, tools, thumbnail, image, link, category, createdDate, totalPaid, display}){
            this.id = id
            this.clientId = clientId
            this.title = title
            this.description = description
            this.tools = tools
            this.thumbnail = thumbnail
            this.image = image
            this.link = link
            this.category = category // realism / children / cartoon / vectorial / sculpture / painting / drawing
            this.createdDate = createdDate,
            this.totalPaid = totalPaid,
            this.display = display
        }
}

module.exports = Artwork