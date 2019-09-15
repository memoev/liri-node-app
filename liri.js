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
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function spotifyThisSong() {
    if (request === "") {
         request = "The Sign Ace of Base.";
    }

    spotify.search({ type: 'track', query: request }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items;

        for (i = 0; i < 1; i++) {
            console.log('========================\nArtist(s): ' + song[i].album.artists[i].name + "\n------------------------\nThe song's name: " + song[i].name + '\n------------------------\nA preview link: ' + song[i].preview_url + '\n------------------------\nThe album name: ' + song[i].album.name + '\n========================');
        }
    });
}

function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy").then(function (response) {
        console.log('\n==============================');
        console.log('Title: ' + response.data.Title + '\n--------------------' +
            '\nCame out: ' + response.data.Year + '\n--------------------' +
            '\nIMDB Rating: ' + response.data.imdbRating + '\n--------------------' +
            '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\n--------------------' +
            '\nCountry: ' + response.data.Country + '\n--------------------' +
            '\nLanguage: ' + response.data.Language + '\n--------------------' +
            '\nPlot: ' + response.data.Plot + '\n--------------------' +
            '\nActor(s): ' + response.data.Actors);
        console.log('==============================');
    }).catch(function (error) {
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
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
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        console.log('just do it');
        break;
    default:
        console.log('Command not supported!');
}