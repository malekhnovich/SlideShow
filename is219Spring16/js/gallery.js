// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

//div details fadeToggle
var counter = 0;
var counterBackward=12;
$(document).ready(function() {
	$("#nextPhoto").css("float", "right");

});
$(document).ready(function() {

	$("#nextPhoto").on("click", function () {

		document.getElementById("photo").src = mImages[counter]["imgPath"];
		$("div.details").empty().append("<p>Description: " + mImages[counter]["description"] + "</p>" +
			"<p>Location: " + mImages[counter]["imgLocation"] + "</p>" +
			"<p>Date: " + mImages[counter]["date"] + "</p></details>").show();
		counter++;
		if (counter==13){
			counter=0;
		}




	});

	$("#prevPhoto.rot180").on("click",function () {
		console.log("its been clicked");

		document.getElementById("photo").src = mImages[counterBackward]["imgPath"];
		$( "div.details" ).empty().append( "<p>Description: "+mImages[counterBackward]["description"]+"</p>"+
			"<p>Location: "+mImages[counterBackward]["imgLocation"]+"</p>"+
			"<p>Date: "+mImages[counterBackward]["date"]+"</p></details>").show();

	counterBackward--;
		if(counterBackward==0){
			counterBackward=12;
		}
	});


});



//adding a click handler to the img.moreIndicator
$(".moreIndicator").click(function(){
	if($(".moreIndicator").hasClass("rot90")) {
		console.log("Came back true");
		$(".moreIndicator").addClass("rot270");
	}else{
		$(".moreIndicator").removeClass("rot270");
		console.log("Came back false");
		$(".moreIndicator").addClass("rot90");
	}
	$(".moreIndicator.rot90").fadeToggle();
});








function swapPhoto() {
	for( var mCurrentIndex=0;mCurrentIndex<mImages.length;mCurrentIndex++){
		document.getElementById("photo").src=mImages[mCurrentIndex]["imgPath"];
		$( "div.details" ).empty().append( "<p>Description: "+mImages[mCurrentIndex]["description"]+"</p>"+
		"<p>Location: "+mImages[mCurrentIndex]["imgLocation"]+"</p>"+
		"<p>Date: "+mImages[mCurrentIndex]["date"]+"</p></details>").show();
			mCurrentIndex++;










}







	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	//console.log(mImages[mCurrentIndex]);
	console.log('swap photo');
}

// Counter for the mImages array

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';
// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
function mRequestListener(){
	var mJson=this.responseText;

	galleryImage=JSON.parse(mJson);
	GalleryImage.location=galleryImage.images["imgLocation"];
	GalleryImage.img=galleryImage.images["imgPath"];
	GalleryImage.description=galleryImage.images["description"];
	GalleryImage.date=galleryImage.images["date"];

	for(mCurrentIndex=0;mCurrentIndex<galleryImage.images.length;mCurrentIndex++){
		mImages.push(galleryImage.images[mCurrentIndex]);

		//console.log(mImages[mCurrentIndex]);
	}
	console.log(GalleryImage.date);

}
mRequest.addEventListener("load",mRequestListener);
mRequest.open("GET",mUrl);
mRequest.send();

//GalleryImage=JSON.parse(mUrl);
//GalleryImage=JSON.parse(mRequest.responseText);
// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;




//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);
//PART 1
var GalleryImage=function GalleryImage(location,description,date,img) {
	this.location=location;
	this.description=description;
	this.date=date;
	this.img=img;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
};