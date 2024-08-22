const UseCaseInterface = require("../interfaces/UseCasInterface");

class GetSongs extends UseCaseInterface{
    async execute (){
      songRows = await getAllSongs();
      return songRows.map(song => new Song(   
    {
        id : song.id,
        title : song.title,
        author : song.author,
        songLink : song.songLink,
    } ));
    }
}

module.exports = GetSongs;