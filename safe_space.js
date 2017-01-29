/*
 * Safe Space : Makes social media and internet content safe by making everything positive.
 * Created by Korhan Akcura
 * Version 1.0
 */

 /*_-_Config Variables_-_*/
// Semantria API Authentication Keys
var consumerKey = "d48948d2-649b-4e22-9327-fce93919788f";
var consumerSecret = "a4154b80-f1ef-4770-b0c7-5e3e49862c97";
var applicationName = 'Safe Space';

/*_-_Methods_-_*/
// Generic request message
function getIfRequestSuccess(response, request_name) {

	console.log(response);
	if (response['status'] == 200 || response['status'] == 202) {
		console.log(request_name + ' : Success');
		return true;
	} else {
		console.log(request_name + ' : Error');
		return false;
	}
}

function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
		end = new Date().getTime();
	}
}

/*_-_Main Logic_-_*/
var document_body = $(document.body);
var modified_html = document.body.innerHTML;

// Make original document hidden
document_body.css('visibility', 'hidden');

var session = new Semantria.Session(consumerKey, consumerSecret, applicationName, null);

var requestObj = new Semantria.Request(consumerKey, consumerSecret, applicationName, null);

var response = requestObj.authWebRequest("GET", session.API_HOST + "/status");

// On an error stop execution
if(getIfRequestSuccess(response, "Authenticate")){

	var page_texts = document_body.text().replace(/.{1000}\S*\s+/g, "$&@").split(/\s+@/);
	var num_texts = page_texts.length;

	for(var i = 0; i<num_texts; i++){

		var trim_text = page_texts[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');

		var documentID = "d2e7341-a3c2-4fb4-9d3a-779e8b0a5eff";
		var postData = "{ \"id\": \""+documentID+"\", \"text\": \""+trim_text+"\", \"tag\": \"marker\"}";

		response = requestObj.authWebRequest("POST", session.API_HOST + "/document.json", postData);

		if(getIfRequestSuccess(response, "Post Text")){

		response = requestObj.authWebRequest("GET", session.API_HOST + "/document/" + documentID + ".json" , null);

			if(getIfRequestSuccess(response, "Analize Result")){


				var json_result = jQuery.parseJSON(response['data']);
				var num_detects = json_result.phrases.length;

				for(var j = 0; j<num_detects; j++){

					if (json_result.phrases[j].sentiment_polarity === "negative"){

						var original = json_result.phrases[j].title;


						$.get( "https://api.datamuse.com/words?rel_ant="+json_result.phrases[j].title, function( data ) {
							var antonym = data[0].word;
							var regex = new RegExp(original, "gi");
							//document_body.html().replace(regex,antonym);
							document.body.innerHTML = modified_html.replace(regex, antonym);
						});

					}

				}


			}

		}

	}

}

// Make positive document visible
document_body.css('visibility', 'visible');
