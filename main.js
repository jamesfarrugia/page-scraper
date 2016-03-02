var page = require('webpage').create();
var url  = "http://exiplatform.com/sample.html";
var scraper = {};

page.onError = function (msg, trace)
{
	console.trace(msg);
	phantom.exit();
};

page.onResourceError = function(resourceError)
{
	console.error(resourceError.url + ': ' + resourceError.errorString);
};

page.onAlert = function(msg)
{
	console.log("[alert] - " + msg);
};

scraper.onOpen = function()
{
	console.log("jquery injected");

	var evaluated = page.evaluate(function()
	{
		console.log("page evaulated");
		return $("html").html();
	});

	console.log("------------evaluation result-----------------");
	console.log(evaluated);

	phantom.exit();
};

page.open(url, function(status)
{
	console.log("open - " + url +  " - "  + status);

	page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
	scraper.onOpen);
});
