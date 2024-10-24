class Video {
    constructor({thumbnail, link, description, title, id = null}){
            this.id = id
            this.thumbnail = thumbnail
            this.link = link
            this.description = description
            this.title = title
    }
}

module.exports = Video