require("dotenv").config();
const Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var request = process.argv.slice(3).join('+');

switch (command) {
    case "concert-this":
        console.log('concert');
        break;
    case "spotify-this-song":
        console.log('spotify');
        break;
    case "movie-this":
        console.log('movie');
        break;
    case "do-what-it-says":
        console.log('just do it');
        break;
    default:
        console.log('Command not supported!');
}