var log = false;

function jumpToTabByURL(url, exact, force)
{
    // alert("jumpToTabByURL " + url + " exact = " + exact );
    if(log)  console.log("looking for " + url + " " + exact);
    if(force === undefined)
	force = true;
    if(exact === undefined)
	exact = true;    
    
    var found = false;
    var pr = browser.windows.getAll({ populate: true });
    var ctr = 0;
    pr.then(
	function(windowList) {
	    // alert("[then] still looking for " + url + " " + exact);
	    windowList.forEach(function(window) {
		window.tabs.forEach(function(tab) {
		    if(log) console.log(tab + " " +  tab.url);
		    ctr++;
		    var ok = exact ? tab.url == url : tab.url.match(url) !== null;
		    if(!ok) 
			ok = exact ? tab.title == url : tab.title.match(url) !== null;
		    
		    if(ok) {
			// console.log("found tab for " + url + " " + tab);
			// alert("found existing tab " + tab.url);
			showTab2(tab, window);
			found = true;

			// Can stop the looping here but how - throw an error, return false/true ?
		    }
		    
		})
	    })
	    if(!found && force) {
		// alert("couldn't find existing tab for " + url + " in " + ctr + " existing tabs");
		browser.tabs.create({ url: url}) ;
	    }

	},
        err => console.log("error: "+ err));
}


function showTab2(tab, window)
{
    browser.tabs.update(tab.id, {active: true});

    if(log) console.log("showTab2: " + tab.windowId);

	  // if the tab is not in the current window, bring that window to the front.
    if(window && !window.active)
	chrome.windows.update(window.id, {focused: true});
    else
	chrome.windows.update(tab.windowId, {focused: true});
}
