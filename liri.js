require("dotenv").config();
var Spotify = require('node-spotify-api')
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");

//create line for readability
var createLine = "========================================"

function askLiri(action, value) {
switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotifyThisSong(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays(value);
        break;

    default:
    console.log("Type into the command line: node liri.js <command> <input>\n")
    console.log("User's Commands:\n concert-this -- Searches for concerts by artist\n spotify-this-song -- Displays information about a specified song\n movie-this -- Displays information about a specified movie\n do-what-it-says -- Run commands from the specified text file")
        break;
}

            //creates a log.txt file and appends the action and value params to the file
fs.writeFile("log.txt", action + "," + value, function(err) {

    // If code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise print: "logs.txt was updated!"
    console.log("log.txt was updated!");
  
  });
}

askLiri(process.argv[2], process.argv[3])

function concertThis(artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var objectBody = JSON.parse(body);
            for (i = 0; i < objectBody.length; i++) {
                console.log(createLine);
                console.log("Venue: " + objectBody[i].venue.name);
                console.log("City: " + objectBody[i].venue.city + ", " + objectBody[i].venue.country);
                console.log(moment(objectBody[i].datetime).format("MM/DD/YY"));
            }
        } else {
            console.log(error);
        }
    });
}

function spotifyThisSong(songName) {            
    if (songName == undefined) {
        songName = "The Sign Ace of Base"
        spotifyThisSong(songName);
    } else {
    spotify.search({ type: 'track', query: songName })
  .then(function(response) {
    var songData = ""
    songData += createLine + "\n"; 
    songData += "Song: " + response.tracks.items[0].name + "\n";
    songData += "Artist: " + response.tracks.items[0].artists.map(artist => artist.name).join(", ") + "\n";
    songData += "URL: " + response.tracks.items[0].album.external_urls.spotify + "\n";
    songData += "Album: " + response.tracks.items[0].album.name;
    console.log(songData)
  })
  .catch(function(err) {
    console.log(err);
    
  });
}
}

function movieThis(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200 && movieName != undefined) {
    
    console.log(createLine);

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);       //[1] for rotten tomatoes
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot Summary: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  } else {
      movieName = "Mr. Nobody"
    movieThis(movieName);
}
});
}

//random fs function takes in commands from random.txt 
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        //If any errors, log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        //Print the contents of data
        console.log(data);
      
        //Split data with commas for readability
        var dataArr = data.split(",");
      
        //Re-display the content as an array
        console.log(dataArr);

        //run askLiri using data array as action and value params
        askLiri(dataArr[0], dataArr[1]);        

      });
}