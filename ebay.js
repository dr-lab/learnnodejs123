var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var app     = express();


app.get('/ebay', function(req, res){
	var reqUrl = url.parse(req.url,true);
	var query = reqUrl.query;
	var id = query.id;
	var comingUrl = "http://www.ebay.com/itm/"+id;

	request(comingUrl, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", links:[]};

			$('.it-ttl').filter(function(){
		        var data = $(this);
		        title = data.text();            
		        json.title = title;
      
	        })
		}

      
      links = $('a'); //jquery get all hyperlinks
  	  $(links).each(function(i, link){
      		console.log($(link).attr('href'));
      		var linkUrl = $(link).attr('href');
      		if(linkUrl && (linkUrl.indexOf('http')>-1)){
      			json.links.push({"name":$(link).text(), "URL": $(link).attr('href')});
      		}
  	  });


      res.send(JSON.stringify(json, null, 4));



        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
       // res.send('Check your console!')
	})
})

var port = Number(process.env.PORT || 5000);
app.listen(port)
console.log('Magic happens on port '+port);
exports = module.exports = app;