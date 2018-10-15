console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const Spotify = require('node-spotify-api');
