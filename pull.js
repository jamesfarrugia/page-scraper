var page = require('webpage').create();
//var config = { url:"http://exiplatform.com/sample.html", selector:"body"  };
var config = {url:"http://10.0.0.35"};

page.onError = function (msg, trace) 
{
	console.trace(msg);
    phantom.exit();
};

page.onResourceError = function(resourceError) {
    console.error(resourceError.url + ': ' + resourceError.errorString);
};

page.onAlert = function(msg) 
{
    console.log(msg);

    if( msg == "EXIT" )
        phantom.exit();
};

page.open(config.url, function(status) 
{
	console.log("open - " + config.url +  " - "  + status);
	page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', function() 
	{
		console.log("jq included");
		
		var evaluated = page.evaluate(function()
		{
			console.log("evaulated");
			/*window.setTimeout(function()
			{
				setInterval(function()
				{
					console.log(pullHtmlString(config));
					phantom.exit();
				}, 5000);
			}, 1);*/
			return $("body").html();
			//return "a";//pullHtmlString();
		});
		console.log(evaluated);
		phantom.exit();
	});
});

function pullHtmlString(config)
{
	console.log("pulling...");
	/*alert($(config.selector).wrap('<p/>').parent().html());
	alert( "EXIT" );*/
	return $("html").html();
}
