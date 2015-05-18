var Twit = require('twit');

var T = new Twit({
    consumer_key: 'obnKk5FnS2ztt44lrb9Xd8gjq'
    , consumer_secret: 'FLchRYt44gkR3DFhv0kykOj6PFFtzjSNRdxYyNYARM3NI1BqtJ'
    , access_token: '2975187454-7PCi1IMXsobaEWttW1oiqg7it9uoIyWFfT5KtO2'
    , access_token_secret: '4IleuTw6sfmiEqcWJaZT3HUjsewq8EfFUtTqTw8HdRvhD'
})

//T.get('application/rate_limit_status',function(err, data, response) {
//  console.log(JSON.stringify(data, null, 2))})


//T.get('statuses/mentions_timeline', {count : 2}, function(err, data, response) {
//    console.log(JSON.stringify(data, null, 2))})


//T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//  console.log(data)
//})
var timeNYC = 0;
var timeBeijing = 0;
var timeLondon = 0;
var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331766000&key=AIzaSyCI-v0iFwA1PqR6xMTKciq88IP-hM1FeO0';
//retourne un xml avec la date
//http://www.earthtools.org/timezone/40.71417/-74.00639


//var test =function getDateInLocation() {
//    var time;
//    var request = require("request");
//    //time in NYC
//    request.get("http://www.earthtools.org/timezone/40.7141667/-54.00639", function(error, response, body) {
//        if (!error && response.statusCode == 200) {
//            var parseString = require('xml2js').parseString;
//            parseString(body, function(err, result) {
//                time = result.timezone.localtime;
//                time = time.toString();
//                timeNYC = time;
//                //console.log("timeNYC: " + timeNYC);
//            });
//        }
//    });
//
//    //time in Beijing
//    request.get("http://www.earthtools.org/timezone/39.92889/116.38833", function(error, response, body) {
//        if (!error && response.statusCode == 200) {
//            var parseString = require('xml2js').parseString;
//            parseString(body, function(err, result) {
//                time = result.timezone.localtime;
//                time = time.toString();
//                timeBeijing = time;
//                //console.log("timeBeijing: " + timeBeijing);
//            });
//        }
//    });
//
//
//    //time in London
//    request.get("http://www.earthtools.org/timezone/51.5/-0.116667", function(error, response, body) {
//        if (!error && response.statusCode == 200) {
//            var parseString = require('xml2js').parseString;
//            parseString(body, function(err, result) {
//                time = result.timezone.localtime;
//                time = time.toString();
//                timeLondon = time;
//                //console.log("timeLondon: " + timeLondon);
//            });
//        }
//    });
//    return "toto";
//}
//
//
//setTimeout(function() {
//    console.log(typeof test);
//    console.log("resultat final: " + timeNYC);
//}, 5000);



//var test = getDateInLocation();

//permet de voir en temps réel tous les tweets qui passent
//var stream = T.stream('statuses/filter', {track: 'mightyyDuck'})
//stream.on('tweet', function(tweet) {
//    console.log('listening for tweets');
//    console.log(tweet);
//    console.log(tweet.text);
//    if (tweet.text.indexOf('time') > -1) {
//        var d = new Date();
//        console.log(d);
//        console.log(d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
//        //renvoie un tweet donnant la date exacte
//
//        getDateInLocation();
//        //var test = getDateInLocation();
//
//        setTimeout(function() {
//            console.log("timeLondonf: " + timeLondon);
//            console.log("timeBeijingf: " + timeBeijing);
//            console.log("timeNYCf: " + timeNYC);
//        }, 5000);
////        T.post('statuses/update', {status: '@' + tweet.user.screen_name + ' \n Date a lemplacement du bot : ' + d + "\n\n\ date a new york :" + timeNYC}, function(err, data, response) {
////            console.log(getDateInLocation(40.7142700, -74.0059700));
////        })
//    }
//    else {
//        // Si l'utilisateur fait une erreur dans ce quil a tappé, il lui renvoie un tweet d'erreur.
//        console.log("erreur dans la demande");
//        T.post('statuses/update', {status: '@' + tweet.user.screen_name + ' Desole erreur dans votre demande'}, function(err, data, response) {
//            console.log(data);
//        })
//    }
//})







//fonction avec le return
var timeNYC;
function getDateInLocation(latitude, longitude) {
    var time;
    var request = require("request");
    request.get("http://www.earthtools.org/timezone/" + latitude + "/" + longitude, function(error, response, body) {
        //if (!error && response.statusCode == 200) {
            var parseString = require('xml2js').parseString;
            parseString(body, function(err, result) {
                time = result.timezone.localtime;
                time = time.toString();
                timeNYC = time;
                console.log("time: " + time);
            });

        //}
        console.log("time2: " + time);
    });

//    setTimeout(function() {
//        console.log("time3: " + time);
//        return time;// on veut qu'il retourne toto ca marche pas
//    }, 5000);
    console.log("timetest: " + time);
   // return time;
}

var test = getDateInLocation(40.7142700, -74.0059700);
setTimeout(function() {
    console.log(typeof test);
    console.log("resultat final: " + timeNYC);
}, 10000);

// retweet pour chaque mention
// 
//function retweetRecent() {
//	T.get('search/tweets', {q: "@GreatMightyDuck ", result_type: "recent"}, function (err, data,response) {
//		if (!err) {
//			var retweetId = data.statuses[0].id_str;
//			T.post('statuses/retweet/' + retweetId, { }, function (err, response) {
//				if (response) {
//					console.log('Retweeted Tweet ID: ' + retweetId);
//				}
//				if (err) {
//					console.log('Retweet Error: ', err);
//				}
//			});
//		} else {
//			console.log('Search Error: ', err);
//		}
//	});
//}
//
//retweetRecent();
//setInterval(retweetRecent, 60000);

//var test = getDateInLocation(40.7142700, -74.0059700);
//
//function getDateInLocation(latitude, longitude) {
//    var request = require("request");
//    var time;
//    request.get("http://www.earthtools.org/timezone/" + latitude + "/" + longitude, function(err, res, body) {
//        if (!err) {
//            var parseString = require('xml2js').parseString;
//            var xml = body;
//            parseString(xml, function(err, result) {
//                //console.log(JSON.stringify(result, null, 2));
//                time = result.timezone.localtime;
//                time = time.toString();
//            });
//        }
//        console.log("time2:" + time);
//        console.log(typeof time);
//    });
//    console.log("time3:" + time);
//    console.log(typeof time);
//
//
//    setTimeout(function() {
//        return time;
//    }, 5000);
//}

// doc npm install request
//npm install xml2js
//http://www.earthtools.org/webservices.htm#timezone