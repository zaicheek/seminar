// Events code -- load the .json file and parse it, then add the appropriate modal windows
// and upcoming / past events

window.onload = function() {
	cDate = new Date(Date.now());
	let thisweek = [];
	let upcoming = [];
	let past = [];
	let archive = [];

	// sort events to be oldest -> newest
	events.sort(function(a,b) {return (new Date(b.date).valueOf())-(new Date(a.date).valueOf())});

	// parse events by date and sort into upcoming and past
	for (let ei = 0; ei<events.length; ei++) {
		let e = events[ei],
			eDate = new Date(events[ei].date);

		let eV = eDate.valueOf()/1000/60/60/24;
		let cV = cDate.valueOf()/1000/60/60/24;
		if (eV>(cV-0.75)) { 
			if (eV<(cV+5)) {
				console.log('Date is within one week');
				thisweek.unshift(e);
			} else {
				console.log('Date is in the future');
				upcoming.unshift(e);
			}
		} else if (e.type.toLowerCase()!="open") {
			if (eV<(cV-90)) {
				console.log('Date is more than 3 months past');
				archive.unshift(e);
			} else {
				console.log('Date is within 3 months');
				past.push(e);
			}
		}
	}
	// if this week is empty remove it
	if (thisweek.length==0) {
		document.getElementById("thisweek").style.display="none";
	}
	for (let ei = 0; ei<thisweek.length; ei++) {
		let e = thisweek[ei],
			eDate = new Date(thisweek[ei].date);
		buildEvent(e,eDate,'thisweek');
	}
	// build upcoming events
	for (let ei = 0; ei<upcoming.length; ei++) {
		let e = upcoming[ei],
			eDate = new Date(upcoming[ei].date);
		buildEvent(e,eDate,'upcoming');
	}
	// build past events
	for (let ei = 0; ei<past.length; ei++) {
		let e = past[ei],
			eDate = new Date(past[ei].date);
		buildEvent(e,eDate,'past');
	}
	// archive
	for (let ei = 0; ei<archive.length; ei++) {
		let e = archive[ei],
			eDate = new Date(archive[ei].date);
		archiveEvent(e,eDate);
	}
}

function archiveEvent(e,eDate) {
	let table = document.getElementById("archive_table");

	row = table.insertRow(1);

	let date = row.insertCell(0);
	date.innerHTML = eDate.toDateString();
	let speaker = row.insertCell(1);
	speaker.innerHTML = e.author;
	let title = row.insertCell(2);
	title.innerHTML = e.title;

	row.style.borderBottom = "1px solid";
	row.style.borderTop = "1 px solid";
	row.style.borderCollapse = "collapse";
}

function buildEvent(e,eDate,type) {
	let info = createInfo(e,eDate);
	let temp_div = document.createElement('div');
	if (e.type=='Talk') {
		let modal_id = createModal(e,eDate);
		temp_div.onclick = function() {openModal(modal_id);}
		temp_div.setAttribute("class", "info");
	} else if (e.type=='Journal Club') {
		temp_div.onclick = function() {window.open(e.link,"_self");}
		temp_div.setAttribute("class", "info");
	} else {
		temp_div.setAttribute("class", "info-open");
	}
	temp_div.id = e.date;
	temp_div.innerHTML = info;

	document.getElementById(type).appendChild(temp_div);
	document.getElementById(type).appendChild(document.createElement('br'));
}

function createInfo(event,eDate) {
	let str = '';

	if (event.type=="Open") {
		// set just the header
		str = str.concat('<div class="info_open">')
		str = str.concat('<br>');
		str = str.concat('<h5>'+eDate.toDateString()+'</h5>');
		str = str.concat('<h5>Open date: email <a href="mailto:danbirman@gmail.com">Dan</a> or <a href="mailto:mareikegrotheer@gmail.com">Mareike</a> if you are interested in presenting.</h5>')
		str = str.concat('</div>');
	} else if (event.type=="Journal Club") {
		// Create left div (img)
		str = str.concat('<div class="info_left">'+
			'<img class="info_img" src="./imgs/paper.png"/>'
			+'</div>')
		// Add title
		str = str.concat('<div class="info_right">')
		str = str.concat('<h4>Journal club: '+event.title+'</h4>');
		if (event.time!=undefined) {
			str = str.concat('<h5>'+eDate.toDateString()+' - '+event.time+'</h5>');
		} else {
			str = str.concat('<h5>'+eDate.toDateString()+' - 11 AM</h5>');
		}
		str = str.concat('<br>')
		str = str.concat('<h5>Journal club led by '+event.author+'</h5>')
		str = str.concat('</div>');
	} else {
		// Create left div (img)
		str = str.concat('<div class="info_left">'+
			'<img class="info_img" src="./imgs/'+event.prefix+'.jpg"/>'
			+'</div>')
		// Add title
		str = str.concat('<div class="info_right">')
		str = str.concat('<h4>'+event.title+'</h4>');
		if (event.time!=undefined) {
			str = str.concat('<h5>'+eDate.toDateString()+' - '+event.time+'</h5>');
		} else {
			str = str.concat('<h5>'+eDate.toDateString()+' - 9:30 AM</h5>');
		}
		str = str.concat('<br>')
		str = str.concat('<h5>'+event.author+'</h5>')
		// Alternate author line with affiliation details: (but Dan prefers just author first/last, looks cleaner)
		// str = str.concat('<h5>'+event.author+', '+event.info+'</h5>')
		str = str.concat('</div>');
	}

	return str;
}

function createModal(event,eDate) {
	let id = Math.round(Math.random() * 100000000);
	console.log('Creating modal with id: ' + id);
	// create a new modal and append to body
	let modal_div = document.createElement('div');
	modal_div.setAttribute("class","modal");
	modal_div.setAttribute("id",id);

	let str = '';

	str = str.concat('<div class="modal-content fifty">')
	str = str.concat('<span class="close">&times;</span>')
	str = str.concat('<br>')
	// str = str.concat('<div class="modal-content-info">')
	// str = str.concat('<h1>'+event.title+'</h1>')

	// Flyer
	str = str.concat('<img width="100%" src='+'"flyers/'+event.prefix+'.png"'+'></img>')

	// // Testing table separation
	// str = str.concat('<div style="display:table">');
	// str = str.concat('<div style="display:table-cell;vertical-align:top;width:100%">')
	// if ((event.time!=undefined) && (event.time!="")) {
	// 	str = str.concat('<p>'+eDate.toDateString()+' - '+event.time+'</p>');
	// } else {
	// 	str = str.concat('<p>'+eDate.toDateString()+' - 9:30 AM</p>');
	// 	str = str.concat('<p>Jordan Hall (Building 420), Room 419</p>')
	// }
	// str = str.concat('<h2>'+event.author+'</h2>')
	// str = str.concat('<p>'+event.info+'</p>')
	// // str = str.concat('</div>')
	// // str = str.concat('<div class="modal-content-img">')
	// // str = str.concat('</div>')
	// str = str.concat('</div>')

	// // Image cell
	// str = str.concat('<div style="display:table-cell;vertical-align:top">')
	// str = str.concat('<img class="modal-img" src="./imgs/'+event.image+'"/>')
	// str = str.concat('</div>')

	// // Close table
	// str = str.concat('</div>')

	// // Abstract
	// str = str.concat('<h2>Abstract</h2>')
	// str = str.concat('<p>'+event.abstract+'</p>')

	// Close modal
	str = str.concat('</div>')

	modal_div.innerHTML = str;

	document.body.appendChild(modal_div);

	return id;
}


// <div id="temp" class="modal">

//   <!-- Modal content -->
//   <div class="modal-content sixty">
//     <span class="close">&times;</span>
//   </div>
// </div>

//// modal stuff

function openModal(id) {
	console.log('Opening: ' + id);
	document.getElementById(id).style.display='block';
}

window.onclick = function(event) { closeCheck(event); }
window.ontouchstart = function(event) {closeCheck(event); }

function closeCheck(event) {
	target = event.target;
	if ((event.target.className == "close") || (event.target.className== "modal-content-big")) {
    	// chain parentElements until you find the modal
    	var parent = event.target.parentElement;
    	while (parent.className!="modal") {
    		parent = parent.parentElement;
    	}
    	parent.style.display = "none";
    }
    if (event.target.className == "modal") {
    	event.target.style.display = "none";
    }
}
