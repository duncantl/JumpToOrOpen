
document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

    if (element.tagName == 'A') {
	// alert("catching link to " + element.href);
	let ex = e.exact;
	if(ex === undefined)
	    ex = true;
	else
	    ex = false;
	
	jumpToTabByURL(element.href, ex, true);
	return false; // prevent default action and stop event propagation
    }
};
