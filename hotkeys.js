var URLs = { oasis: ["https://oasis.ucdavis.edu", false],
	     prm: ["https://prm.gs.ucdavis.edu", false],
	     gradProgs: ["https://grad.ucdavis.edu/graduate-programs", false],
	     calendar: ["https://calendar.google.com/calendar/u/0/r", false],
	     gmail: ["https://mail.google.com/mail", false], // E as M is reserved for mute.
	     washpost: ["https://www.washingtonpost.com", true],
	     nytimes: ["https://www.nytimes.com/?$", true], // not matching
	     hackerNews: ["https://news.ycombinator.com", false]	     
	   };
	     

function handleKeyCommand(command)
{
    console.log("command = " + command);
    let u = URLs[command];
    // see if the page alread exists and jump to that.
    // take code from JumpToOrOpen
    if(!(u === undefined)) {
	// browser.tabs.create({url: u});
	jumpToTabByURL(u[0], u[1], true);
	/*
	console.log("calling jumpToTabByURL in current window");
	browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
	.then(tabs => browser.tabs.get(tabs[0].id))
	.then(t => browser.scripting.executeScript({target: {tabId: t.id}, func: jumpToTabByURL, args: [u, true, true]}));
	*/
    } else
	console.log("no URL mapping for " + command);
}


browser.commands.onCommand.addListener(handleKeyCommand);
