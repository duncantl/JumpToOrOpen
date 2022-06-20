function jumpToTabByURL(url, exact)
{
    console.log("looking for " + url + " " + exact);
    var found = false;
    var pr = browser.windows.getAll({populate: true});
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
	    if(!found)
		browser.tabs.create({ url: url}) ;
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



document.getElementById('tabURL').addEventListener('change', function(ev) { jumpToTabByURL(ev.target.value, false); } );
