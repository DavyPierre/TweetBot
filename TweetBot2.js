var Twit = require('twit');

var T = new Twit({
    consumer_key: ' '
    , consumer_secret: ' '
    , access_token: ' '
    , access_token_secret: ' '
})


var timeNYC;
var timeBeijing;
function getDateInLocation() {
    var time;
    var request = require("request");
    //time in NYC
    request.get("http://www.earthtools.org/timezone/40.7141667/-54.00639", function(error, response, body) {
        //if (!error && response.statusCode == 200) {
        var parseString = require('xml2js').parseString;
        parseString(body, function(err, result) {
            time = result.timezone.localtime;
            time = time.toString();
            timeNYC = time;
        });
        console.log("timeNYC: " + time);
    });

    //time in Beijing
    request.get("http://www.earthtools.org/timezone/39.92889/116.38833", function(error, response, body) {
        //if (!error && response.statusCode == 200) {
        var parseString = require('xml2js').parseString;
        parseString(body, function(err, result) {
            time = result.timezone.localtime;
            time = time.toString();
            timeBeijing = time;
        });
        console.log("timeBeijing: " + time);
    });
}




//permet de voir en temps réel tous les tweets qui passent
var stream = T.stream('statuses/filter', {track: 'mightyyDuck'})
stream.on('tweet', function(tweet) {
    console.log('listening for tweets');
    console.log(tweet);
    console.log(tweet.text);
    if (tweet.text.indexOf('time') > -1) {
        var d = new Date();
        console.log(d);
        console.log(d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
        var test = getDateInLocation();
        console.log("timnycl: " + timeNYC);

        setTimeout(function() {
            console.log("timneNYC: " + timeNYC);
            T.post('statuses/update', {status: '@' + tweet.user.screen_name + ' \n Bot : ' + d + "\nNYC :" + timeNYC +"\nBei: "+timeBeijing}, function(err, data, response) {
                console.log("done");
            });
        }, 5000);
    }
    else {
        // Si l'utilisateur fait une erreur dans ce quil a tappé, il lui renvoie un tweet d'erreur.
        console.log("erreur dans la demande");
        T.post('statuses/update', {status: '@' + tweet.user.screen_name + ' Desole erreur dans votre demande'}, function(err, data, response) {
            console.log(data);
        })
    }
})
