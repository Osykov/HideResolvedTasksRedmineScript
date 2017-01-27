function isStartProjTr(tableRow) {
	try {
		return tableRow.children[0].children[0].innerText == '*: ';
	} catch (err) {
		return false;
	}
};

//get table that contains all not 'Closed' tasks
var timeInputTableElObj = document.getElementById('time_input_table');

var theTableBody = timeInputTableElObj.children[0];
var tableRows = theTableBody.children;

// '*:' - project tr identifier
var startProjPos = -1;
var hasUnresolvedTask = false;
for (var i = 0; i < tableRows.length; i++) {
    var currentTr = tableRows[i];
    if (isStartProjTr(currentTr)) {
    	if (!hasUnresolvedTask && startProjPos != -1) {
    		hideTableRow(tableRows[startProjPos]);
    	}
    	startProjPos = i;
    	hasUnresolvedTask = false;
    } else if(isResolvedTask(currentTr)) {
    	hideTableRow(currentTr);
    } else if (!hasUnresolvedTask && isUnresolvedTask(currentTr)) {
    	hasUnresolvedTask = true;
    }
}



function hideTableRow(tableRow) {
	try {
		tableRow.style.display = 'none';
	} catch (err) {}
}

function isResolvedTask(tableRow) {
	try {
		var e = tableRow.children[3].children[0];
		return e.options[e.selectedIndex].text == 'Resolved';
	} catch (err) {
		return false;
	}
}

function isUnresolvedTask(tableRow) {
	try {
		var e = tableRow.children[3].children[0];
		return e.options[e.selectedIndex].text != 'Resolved' || e.options[e.selectedIndex].text != 'Closed';
	} catch (err) {
		return false;
	}
}
