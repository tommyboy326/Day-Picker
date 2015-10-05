function getDateString(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate()
}


function getMonthYearString(dt) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ][dt.getMonth()] +
        ' ' + dt.getFullYear();
}


function chooseDate(e) {
    var targ; 
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; 

    var div = targ.parentNode.parentNode.parentNode.parentNode.parentNode; 
    var idOfTextbox = div.getAttribute('datepickertextbox'); 
    var textbox = document.getElementById(idOfTextbox); 
    if (targ.value == '<' || targ.value == '>' || targ.value == '<<' || targ.value == '>>') { 
        createCalendar(div, new Date(targ.getAttribute('date')));
        return;
    }
    textbox.value = targ.getAttribute('date'); 
    div.parentNode.removeChild(div); 
}


function parseMyDate(d) {
    if (d == "") return new Date('NotADate'); 
    var a = d.split('-');
    if (a.length != 3) return new Date(d); 
    var m = -1; 
    if (a[1] == '1') m = 0;
    if (a[1] == '2') m = 1;
    if (a[1] == '3') m = 2;
    if (a[1] == '4') m = 3;
    if (a[1] == '5') m = 4;
    if (a[1] == '6') m = 5;
    if (a[1] == '7') m = 6;
    if (a[1] == '8') m = 7;
    if (a[1] == '9') m = 8;
    if (a[1] == '10') m = 9;
    if (a[1] == '11') m = 10;
    if (a[1] == '12') m = 11;
    if (m < 0) return new Date(d); 
    return new Date(a[0], m, a[2], 0, 0, 0, 0);
}


function createCalendar(div, month) {
    var idOfTextbox = div.getAttribute('datepickertextbox'); 
    var textbox = document.getElementById(idOfTextbox); 
    var tbl = document.createElement('table');
    var topRow = tbl.insertRow(-1);
    var td = topRow.insertCell(-1);
    var lastYearBn = document.createElement('input');

    lastYearBn.type = 'button'; 
    td.appendChild(lastYearBn);
    lastYearBn.value = '<<';
    lastYearBn.onclick = chooseDate;
    lastYearBn.className = 'selected_year';
    lastYearBn.setAttribute('date', new Date(month.getFullYear(), month.getMonth() - 12, 1, 0, 0, 0, 0).toString());

    var td = topRow.insertCell(-1);
    var lastMonthBn = document.createElement('input');
    lastMonthBn.type = 'button'; 
    td.appendChild(lastMonthBn);
    lastMonthBn.value = '<';
    lastMonthBn.onclick = chooseDate;
    lastMonthBn.className = 'selected_month';
    lastMonthBn.setAttribute('date', new Date(month.getFullYear(), month.getMonth() - 1, 1, 0, 0, 0, 0).toString());

    var td = topRow.insertCell(-1);
    td.colSpan = 3;
    var mon = document.createElement('input');
    mon.type = 'text';
    td.appendChild(mon);
    mon.value = getMonthYearString(month);
    mon.size = 15;
    mon.disabled = 'disabled';
    mon.className = 'monthDsp';

    var td = topRow.insertCell(-1);
    var nextMonthBn = document.createElement('input');
    nextMonthBn.type = 'button';
    td.appendChild(nextMonthBn);
    nextMonthBn.value = '>';
    nextMonthBn.onclick = chooseDate;
    nextMonthBn.className = 'selected_month';
    nextMonthBn.setAttribute('date', new Date(month.getFullYear(), month.getMonth() + 1, 1, 0, 0, 0, 0).toString());
    
    var td = topRow.insertCell(-1);
    var nextYearBn = document.createElement('input');
    nextYearBn.type = 'button'; 
    td.appendChild(nextYearBn);
    nextYearBn.value = '>>';
    nextYearBn.onclick = chooseDate;
    nextYearBn.className = 'selected_year';
    nextYearBn.setAttribute('date', new Date(month.getFullYear(), month.getMonth() + 12, 1, 0, 0, 0, 0).toString());
    
    var daysRow = tbl.insertRow(-1);
    daysRow.insertCell(-1).innerHTML = "Mon";
    daysRow.insertCell(-1).innerHTML = "Tue";
    daysRow.insertCell(-1).innerHTML = "Wed";
    daysRow.insertCell(-1).innerHTML = "Thu";
    daysRow.insertCell(-1).innerHTML = "Fri";
    daysRow.insertCell(-1).innerHTML = "Sat";
    daysRow.insertCell(-1).innerHTML = "Sun";
    daysRow.className = 'daysRow';
    
    var selected = parseMyDate(textbox.value); 
    var today = new Date();
    date = new Date(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0); 
    var extras = (date.getDay() + 6) % 7; 
    date.setDate(date.getDate() - extras); 
    while (1) { 
        var tr = tbl.insertRow(-1);
        for (i = 0; i < 7; i++) { 
            var td = tr.insertCell(-1);
            td.className = 'days_box_outter';
            var inp = document.createElement('input');
            inp.type = 'button';
            td.appendChild(inp);
            inp.value = date.getDate();
            inp.onclick = chooseDate;
            inp.setAttribute('date', getDateString(date));
            if (date.getMonth() != month.getMonth()) {
                if (inp.className) inp.className += ' ';
                inp.className += 'othermonth days_box';
            }
            if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
                if (inp.className) inp.className += ' ';
                inp.className += 'today days_box';
            }
            if (!isNaN(selected) && date.getDate() == selected.getDate() && date.getMonth() == selected.getMonth() && date.getFullYear() == selected.getFullYear()) {
                if (inp.className) inp.className += ' ';
                inp.className += 'selected days_box';
            }else{
                if (inp.className) inp.className += ' ';
                inp.className += 'days_box';
            }
            date.setDate(date.getDate() + 1); 
        }
        
        if (date.getMonth() != month.getMonth()) {
            break;
        }
    }

    
    if (div.hasChildNodes()) { 
        div.replaceChild(tbl, div.childNodes[0]);
    } else { 
        div.appendChild(tbl);
    }
}


function showDatePicker(idOfTextbox) {
    var textbox = document.getElementById(idOfTextbox);
    x = textbox.parentNode.getElementsByTagName('div');
    for (i = 0; i < x.length; i++) {
        if (x[i].getAttribute('class') == 'datepickerdropdown') {
            textbox.parentNode.removeChild(x[i]);
            return false;
        }
    }
    var date = parseMyDate(textbox.value);
    if (isNaN(date)) date = new Date();
   
    var div = document.createElement('div');
    div.className = 'datepickerdropdown';
    div.setAttribute('datepickertextbox', idOfTextbox); 
    createCalendar(div, date); 
    insertAfter(div, textbox); 
    return false;
}


function insertAfter(newItem, existingItem) {
    if (existingItem.nextSibling) { 
        existingItem.parentNode.insertBefore(newItem, existingItem.nextSibling);
    } else { 
        existingItem.parentNode.appendChild(newItem);
    }
}