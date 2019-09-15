require("dotenv").config();
var axios = require('axios');
const Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var request = process.argv.slice(3).join('+');

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(function (response) {
        console.log('============ ' + process.argv.slice(3).join(' ') + ' ============');
        for (i = 0; i < 3; i++) {
            console.log('Venue Name: ' + response.data[i].venue.name + '\nVenue Country: ' + response.data[i].venue.country + '\nVenue City: ' + response.data[i].venue.city);
            console.log('----------------------------------');
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

switch (command) {
    case "concert-this":
        concertThis();
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