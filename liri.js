// Required node packages.
require("dotenv").config();
var axios = require('axios');
const Spotify = require("node-spotify-api");
var fs = require('fs');
var moment = require('moment');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Arguments from bash
var command = process.argv[2];
var request = process.argv.slice(3).join('+');

// Welcome message
function welcome() {
    console.log("\x1b[32m","____ ____ ____ ____ ____ ____ ____ ");
    console.log("||L |||I |||R |||I |||B |||O |||T ||");
    console.log("||__|||__|||__|||__|||__|||__|||__||");
    console.log("|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|\n", "\x1b[37m");
}

// Function to render concert information from Bands In Town API using axios.
function concertThis() {
    welcome();
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(function (response) {
        console.log('============ ' + process.argv.slice(3).join(' ') + ' ============');
        for (i = 0; i < 3; i++) {
            console.log('Venue Name: ' + response.data[i].venue.name + '\nVenue Country: ' + response.data[i].venue.country + '\nVenue City: ' + response.data[i].venue.city + '\nDate: ' + moment(response.data[i].datetime).format('MM/DD/YYYY'));
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

// Function to render song information from Spotify API using spotify node package.
function spotifyThisSong() {
    welcome();
    if (request === "") {
         request = "The Sign Ace of Base.";
    }

    spotify.search({ type: 'track', query: request }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items;

        for (i = 0; i < 1; i++) {
            console.log('========================\nArtist(s): ' + song[i].album.artists[i].name + 
            "\n------------------------\nThe song's name: " + song[i].name + 
            '\n------------------------\nA preview link: ' + song[i].preview_url + 
            '\n------------------------\nThe album name: ' + song[i].album.name + 
            '\n========================');
        }
    });
}

// Function to render movie information from OMDB API using axios.
function movieThis() {
    welcome();
    if (request === "") {
        request = 'Mr. Nobody'
    }

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

// Function to run random command from switch statement.
function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        var read = data.split(',');

        command = read[0];
        request = read[1];

        // Function to run commands reading random.txt
        function execute(command) {
            const exec = require('child_process').exec

            exec(command, (err, stdout, stderr) => {
                process.stdout.write(stdout)
            })
        }

        execute('node liri ' + command + ' ' + request)
    });
}

// Master switch statement
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
        doWhatItSays();
        break;
    default:
        welcome();
        console.log('Command not supported!');
}