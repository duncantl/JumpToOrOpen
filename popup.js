


// document.getElementById('tabURL').addEventListener('change', function(ev) { jumpToTabByURL(ev.target.value, false); } );



// Previously used approach of 
// var anchors = document.getElementsByTagName("a");
// loop:
//    a.addEventListener('click', function(ev) { jumpToTabByURL(a.href, false); ev.stopImmediatePropagation(); return(false);} )
// but this would not override the regular creation of a new tab from the regular click event.

// https://stackoverflow.com/questions/1760096/override-default-behaviour-for-link-a-objects-in-javascript
// https://javascript.info/bubbling-and-capturing
document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

  if (element.tagName == 'A') {
      let ex = e.target.getAttribute("exact");
	if(ex === undefined)
	    ex = true;
	else
	    ex = false;
      // console.log("hyperlink exact attribute : " +  ex + " " + e.target.exact);
      
      jumpToTabByURL(element.href, ex, true);
    return false; // prevent default action and stop event propagation
  }
}


document.getElementById("pattern").addEventListener("change", function(ev) {
    
    jumpToTabByURL(ev.target.value, false, false)
});





