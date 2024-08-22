const GetSongs = require("../../application/use-cases/GetSongs");

class SongController {
    static async all(req, res) {
        try {
            // İşlemler yapılacak
            res.json({ message: 'All songs' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SongController;
