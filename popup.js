function jumpToTabByURL(url, exact)
{
//    alert("jumpToTabByURL " + url + " exact = " + exact );
    console.log("looking for " + url + " " + exact);
    var found = false;
    var pr = browser.windows.getAll({ populate: true });
    pr.then(
	function(windowList) {
	    windowList.forEach(function(window) {
		window.tabs.forEach(function(tab) {
		    console.log(tab + " " +  tab.url);
		    var ok = exact ? tab.url == url : tab.url.match(url) !== null;
		    if(!ok) 
			ok = exact ? tab.title == url : tab.title.match(url) !== null;
		    
		    if(ok) {
			// console.log("found tab for " + url + " " + tab);
			showTab2(tab, window);
			found = true;
			console.log("found tab " + tab.url);
			// Can stop the looping here but how - throw an error, return false/true ?
		    }
		    
		})
	    })
	    if(!found) {
		alert("creating tab for " + url);
		browser.tabs.create({ url: url}) ;
	    }
	},
        err => console.log("error: "+ err));


    // p.then( () => { if(!done) browser.tabs.create({ url: url}) },  err => console.log("error: " + error));
//    if(found == false) {
//	console.log("didn't find tab so creating one");
//	browser.tabs.create({ url: url}) ;
//    }
}


function showTab2(tab, window)
{
    browser.tabs.update(tab.id, {active: true});

    console.log("showTab2: " + tab.windowId);

	  // if the tab is not in the current window, bring that window to the front.
    if(window && !window.active)
	chrome.windows.update(window.id, {focused: true});
    else
	chrome.windows.update(tab.windowId, {focused: true});
}



// document.getElementById('tabURL').addEventListener('change', function(ev) { jumpToTabByURL(ev.target.value, false); } );



// https://stackoverflow.com/questions/1760096/override-default-behaviour-for-link-a-objects-in-javascript
// https://javascript.info/bubbling-and-capturing
if(true) {
document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

  if (element.tagName == 'A') {
      jumpToTabByURL(element.href, false)
    return false; // prevent default action and stop event propagation
  }
};
} else {

var anchors = document.getElementsByTagName("a");
console.log( anchors + " anchors" ); // anchors.length + " anchors");
 for(let a of anchors)
//for( let i = 0 ; i < anchors.length; i++)
{
//    let a = anchors[i];
    a.style.color = "red";
    a.addEventListener('click', function(ev) { jumpToTabByURL(a.href, false); ev.stopImmediatePropagation(); return(false);} )
}
}