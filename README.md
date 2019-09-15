# LIRI-node-app
IRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Value Proposition :dart:
  
You're own personal assitant! Liri can help you find information about concerts, songs and movies. All of it using verified information from top players in the business. Concert information gets retrived from the Bands In Town API, songs information gets retrived from the Spotify API and movies from the OMDB API. Liri has a random command as well, which will aim to execute any of the three commands explained above. 
  
## Instructions :memo:  
  
Liri can run any of the following commands:
- concert-this (takes and artist name)
- spotify-this-song (takes a song name)
- movie-this (takes a movie name)
- do-what-it-says

All commands should be written after `node liri` from the bash command line. Results will be displayed into the command window.
  
## Code Overview :deciduous_tree:

The most import piece of code on this repository is the `switch` statement running all options within the code. Each case statement contains a function to be ran if the `index[2]` from the bash process arguments matches any of the options inside the block. There's a default case that will encompass requests not supported.
  
```javascript
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
        console.log('Command not supported!');
}
```  
  
## Prerequisites :computer:
Working web browser (e.g Chrome, Firefox, Safari, Opera, etc.) from the list of browser that support jQuery (https://jquery.com/browser-support/):

* Desktop:
  * Chrome: (Current - 1) and Current
  * Edge: (Current - 1) and Current
  * Firefox: (Current - 1) and Current, ESR
  * Internet Explorer: 9+
  * Safari: (Current - 1) and Current
  * Opera: Current

* Mobile
  * Stock browser on Android 4.0+
  * Safari on iOS 7+

  You'll also need to install `node` on your client by running the following on your terminal:
  ```bash
  npm i
  ```
  Users will need a `.env` file specifying Spotify personal keys.