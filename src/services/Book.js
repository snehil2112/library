class Book {
    constructor(obj) {
        this.id = obj.id,
        this.title = obj.title,
        this.volume = obj.volumeinfo,
        this.series = obj.series,
        this.author = obj.author,
        this.edition = obj.edition,
        this.publisher = obj.publisher,
        this.city = obj.city,
        this.pages = obj.pages,
        this.language = obj.language,
        this.download = `http://93.174.95.29/main/${Math.floor(obj.id / 1000) * 1000}/${obj.md5.toLowerCase()}/${obj.author.replace(/ /gi, "%20")}-${obj.title.replace(/ /gi,"%20")}-${obj.publisher.replace(/ /gi, "%20")}(${obj.year}).${obj.extension}`,
        this.cover = `http://93.174.95.29/covers/${obj.coverurl}`,
        this.size = (obj.filesize % 1048576 > 0)?(obj.filesize / 1048576).toFixed(2) + 'MB':(obj.filesize % 1024 > 0)?(obj.filesize / 1024).toFixed(2) + 'KB':obj.filesize.toFixed(2) + 'Bytes',
        this.year = obj.year,
        this.description = obj.descr === "" || obj.descr === null?'No description available':obj.descr,
        this.topic = `topicid${obj.topic}`,
        this.extension = obj.extension
    }
}

module.exports = Book;