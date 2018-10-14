//spotify client id
6d2438b67825461587813afe9c4c3a4e
//spotify client secret
1dc55de007ec452591743ab014a665ff
//spotify example       in terminal            npm install node-spotify-api
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <6d2438b67825461587813afe9c4c3a4e>,
  secret: <1dc55de007ec452591743ab014a665ff>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});


//REQUEST 
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
})