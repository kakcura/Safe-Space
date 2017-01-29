/*
 * Safe Space : Makes social media and internet content safe by making everything positive.
 * Created by Korhan Akcura
 * Version 1.0
 */

 /*_-_Config Variables_-_*/
// Semantria API Authentication Keys
var consumerKey = "d48948d2-649b-4e22-9327-fce93919788f";
var consumerSecret = "a4154b80-f1ef-4770-b0c7-5e3e49862c97";
applicationName = 'Safe Space';

/*_-_Methods_-_*/
// Generic request message
function setApiKeyAndSecretFromResponse(response, request_name) {

	console.log(response);
	if (response['status'] == 200) {
		console.log(request_name + ' : Success');
		return true;
	} else {
		console.log(request_name + ' : Error');
		return false;
	}
}

/*_-_Main Logic_-_*/

var document_body = $(document.body);

// Make original document hidden
document_body.css('visibility', 'hidden');

var session = new Semantria.Session(consumerKey, consumerSecret, applicationName, null);
var requestObj = new Semantria.Request(consumerKey, consumerSecret, applicationName, null);

var response = requestObj.authWebRequest("GET", session.API_HOST + "/status");

// On an error stop execution
if(setApiKeyAndSecretFromResponse(response, "Authenticate")){


// Convert page into positif.


}

// Make positive document visible
document_body.css('visibility', 'visible')