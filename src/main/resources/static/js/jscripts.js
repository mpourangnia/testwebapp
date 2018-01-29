// Generic javascripts that are
// globally accessible.

// No contextmenu (rightclick) for IE
//document.oncontextmenu = function() { return false;}
// To allow right click if ctrl key is pressed, use this line instead (useful during development)
//document.oncontextmenu = function() { return event.ctrlKey;}


//Makes sure that a window isn't trapped inside a frame
function breakout_of_frame() {
  if (top.location != location) {
    top.location.href = document.location.href ;
  }
}


// Redirect and set all frames -
// used for navigation.
function redirect(file,fileRightFrame){
  //parent.leftframe.location.href='AF1logtom.htm';
    if( parent != null && parent.main != null){
		parent.main.location.href=file;
    }
    else {
		alert( "ett problem har uppst�tt" );
    }

    if( file == null ) {
		parent.main.location="noimpl.htm";
    }

    if( fileRightFrame != null ){
		alert("Fixa rightFrame!");
		parent.rightframe.location.href=fileRightFrame;
    }

}

// Set the right (context) menu
//

function setrightm( href )
{
    if( parent != null && parent.rightframe != null )
	{
	    parent.rightframe.location=href;
	}
}



//
// (Attempt to-) Set focus on field.
//
function setFocus(fieldName) {
	setTimeout("doSetFocus('" + fieldName + "');", 50);
}

function doSetFocus(fieldName) {
	try {
		var elementToFocus = document.getElementsByName(fieldName)[0];
        if (!elementToFocus.readOnly) {
        	elementToFocus.focus();
			if (elementToFocus.type == "text" || elementToFocus.type == "textarea") {
            	elementToFocus.select();
            }
        }
	} catch (ex) {
		// Do nuthin' - this isn't a show stopper
	}
}



// Handle button events
function handlereturn(func)
{
  if ("13" == window.event.keyCode)
  {
      eval( func );
  }
}


// Dynamic menu - use as onclick="hideshow(this)"
// on a <THEAD>. Updates the <TBODY>s display (none/inline)
// and updates an arrow gif THAT MUST be in the first
// <td> in the <THEAD>

function hideshow(obj)
{
  var sibl;
  var image;

  image = obj.firstChild.firstChild.firstChild;

  //confirm( image.src );

  sibl = obj.nextSibling;

  if( sibl.style.display == "none")
    {
      sibl.style.display = "inline";
      image.src = "image/down.gif";
    }
  else
    {
      sibl.style.display = "none";
      image.src = "image/right.gif";
    }

}


function hideshow_right(obj)
{
  var sibl;
  var image;

  image = obj.firstChild.firstChild.firstChild;

  //confirm( image.src );

  sibl = obj.nextSibling;

  if( sibl.style.display == "none")
    {
      sibl.style.display = "inline";
      image.src = "../../image/down.gif";
    }
  else
    {
      sibl.style.display = "none";
      image.src = "../../image/right.gif";
    }

}

function toggleByAndImage(id, image) {

 var obj = document.getElementById(id);

  if ( obj.style.display == "none") {
      obj.style.display = "inline";
      image.src = "../../image/down.gif";
    } else {
       obj.style.display = "none";
      image.src = "../../image/right.gif";
    }

}


function toggleById(id1, id2) {

 	var obj1 = document.getElementById(id1);
 	var obj2 = document.getElementById(id2);

  if( obj1.style.display == "none") {
      	obj1.style.display = "inline";
      	obj2.style.display = "none";
   } else {
    	obj2.style.display = "inline";
      	obj1.style.display = "none";
    }

}


// Disable a field
function disable(field) {
	field.readOnly = true;
	field.style.color = "gray";
}

// Enable a field
function enable(field) {
	field.readOnly = false;
	field.style.color = "black";
}

// Block everything except for letters between 'A' and 'Z' and controlchars
function allowOnlyAlfaNumeric() {
	var n = event.keyCode;

	if((n >= 65 && n <= 90) || (n >= 48 || n <= 57) || isControlChar(n)) {
		event.returnValue = true;
	} else {
		event.returnValue = false;
	}
}

// Block non-numeric characters, except for '-', '+', 'A' and almost all letters between 'A' and 'Z' and carriage return
// (Finnish person no accept '+' and 'A')
function allowOnlyOfficialId() {
	var n = event.keyCode;

	if ((n < 48 || n > 57) &&
		n != 65 && n != 66 && n != 67 && n != 68 && n != 69 && n != 70 && n != 72 &&
		n != 74 && n != 75 && n != 76 && n != 77 && n != 78 && n != 80 && n != 82 &&
		n != 83 && n != 84 && n != 85 && n != 86 && n != 87 && n != 88 && n != 89 &&
		n != 43 && n != 45 && n != 13) {
		event.returnValue = false;
	} else {
		event.returnValue = true;
	}
}


// Block non-numeric characters, except for '-', '+', carriage return and 'A' to 'Y' (except 'G', 'I', 'O', 'Q')
function allowOnlyPersonNo() {
	var n = event.keyCode;

	if ((n < 48 || n > 57) &&
		n != 65 && n != 66 && n != 67 && n != 68 && n != 69 && n != 70 && n != 72 &&
		n != 74 && n != 75 && n != 76 && n != 77 && n != 78 && n != 80 && n != 82 &&
		n != 83 && n != 84 && n != 85 && n != 86 && n != 87 && n != 88 && n != 89 &&
		n != 43 && n != 45 && n != 13) {
		event.returnValue = false;
	} else {
		event.returnValue = true;
	}
}

// Block non-numeric characters, except for space, comma, sign and carriage return

// and '.' for foreign dates.
//TODO: allowOnlyDate() should be used instead, and '.' should be removed from here

var ZERO = 48
var NINE = 57

var BACKSPACE = 8;
var TAB = 9;
var SPACE = 32;

var PLUS = 43;
var COMMA = 44;
var MINUS = 45;
var DOT = 46;
var CR = 13;

function allowOnlyInteger() {
	return allowNumericAndSpecialChars(false);
}

function allowOnlyNumeric() {
	return allowNumericAndSpecialChars(true);
}

function allowNumericAndSpecialChars(allowSpecial) {
	var n = event.keyCode;
	var isNumeric = (n >= ZERO  &&  n <= NINE);
	var isSpecialChar = (n == COMMA  ||  n == PLUS  ||  n == MINUS  ||  n == DOT  ||  n == CR  ||  n == SPACE);

	event.returnValue = (isNumeric  ||  (isSpecialChar  &&  allowSpecial));
}

// Block non-numeric characters, except for '-', '.' and carriage return
function allowOnlyDate() {
	var n = event.keyCode;

	if ((n < ZERO  ||  n > NINE)
			&&  n != MINUS  &&  n != DOT  &&  n != CR) {
		event.returnValue = false;
	} else {
		event.returnValue = true;
	}
}

// Block non-numeric characters, allows 0 to 9, and control characters
function allowOnlyDigits() {
	var n = event.keyCode;

	if ((n < ZERO  ||  n > NINE) &&
		!isControlChar(n)) {
		event.returnValue = false;
	} else {
		event.returnValue = true;
	}
}

// Return true if keyCode is a control char, ie arrows, delete, home etc.
function isControlChar(keyCode) {
	if (keyCode == BACKSPACE  ||  keyCode == TAB  ||  keyCode == CR) {
		return true;
	} else {
		return false;
	}
}

//
// Return the argument with whitespace removed
//
function trimWhitespace(s) {
	var result = "";
	var n = 0;
	var i = 0;
	var len = s.length;

	for (i = 0; i < len; i++) {
		// Ignore space and non-break space
		n = s.charCodeAt(i);
		if (n != 32 && n != 160) {
			result += s.charAt(i);
		}
	}
	return result;
}

// Open a new window with status info
// statusId - Id of insurance or claim
function openStatusInfoDialog(statusId) {
	showModalDialog("showStatusInfo.do?action=showStatusInfo"  +
		"&statusId=" + statusId,
		"",
		"dialogHeight:350px; dialogWidth:350px; status:no; help:no; resizable:yes; scroll: no");
}

// Open a window with clause info
// productId - Id of insurance
function openClauseTextDialog(productId,type) {
	var action = "show" + type + "ClauseText";
	showModalDialog(action + ".do?action=" + action +
		"&productId=" + productId,
		"",
		"dialogHeight:200px; dialogWidth:300px; status:no; help:no; resizable:yes; scroll: no");
}

// Open a window with liability info
// productId - Id of insurance
function openLiabilityTextDialog(productId) {
	showModalDialog("showLiabilityText.do?action=showLiabilityText" +
		"&productId=" + productId,
		"",
		"dialogHeight:200px; dialogWidth:300px; status:no; help:no; resizable:yes; scroll: no");
}

// Open a window with premium addition text
// productId - Id of insurance
function openPremiumAdditionText(productId,type) {
	var action = "show" + type + "PremiumAdditionText";
	showModalDialog(action + ".do?action=" + action +
		"&productId=" + productId,
		"",
		"dialogHeight:200px; dialogWidth:300px; status:no; help:no; resizable:yes; scroll: no");
}

// Open a new window with detailed product info
// productId - Id of insurance
function openProductDetailsDialog(productId,type) {
	var action = "show" + type + "ProductDetails";

	url = action + ".do?action=" + action + "&productId=" + productId;
	newWindow = openCenteredWindow(url, 640, 560, "product"+productId,"toolbar=no,menubar=no,resizable=yes,scrollbars=yes,status=no,location=no");
	newWindow.focus();

}

function openCenteredWindow(url, height, width, name, parms) {
   var left = Math.floor( (screen.width - width) / 2);
   var top = Math.floor( (screen.height - height) / 2);
   var winParms = "top=" + top + ",left=" + left + ",height=" + height + ",width=" + width;
   if (parms) { winParms += "," + parms; }
   // in case of long names... (PremiumExemption windows...)
   if (name.length > 10) {
   		name = name.substring(0, 10);
   }
   var win = window.open(url, name, winParms);
   if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
   return win;
}

//TD 3602 Adaptation
// Open a new window with contract adaptation info
// productId - Id of insurance
function openAdaptationDialog(productId,type,hist) {
//alert ("hist "  + hist);
	var action = "show" + type + "Adaptation";

	var url = action + ".do?action=" + action + "&productId=" + productId + "&hist=" + hist;
	newWindow = openCenteredWindow(url, 480, 640, "adaption"+productId,"toolbar=no,menubar=no,resizable=yes,scrollbars=yes,status=no,location=no");
	newWindow.focus();

}

// Open a new window with annotation info
// annotationId - Id of annotation
function openAnnotationDialog(annotationId,type,form) {
	var action = "showAnnotation" + form;
	var url = action + ".do?action=" + action + "&annotationId=" + annotationId + "&type=" + type;

	newWindow = openCenteredWindow(url, 540, 500, "annotationId"+annotationId,"toolbar=no,menubar=no,resizable=yes,scrollbars=yes,status=no,location=no");
	newWindow.focus();

}

//Open a popup window with an edit annotation form
//annotationId - Id of annotation
function openEditAnnotationDialog(id,type,form) {
	var action = "editAnnotation" + form;
	var url = action + ".do?action=" + action + "&annotId=" + id + "&type=" + type;
	var srcStr = escape(url);

	showModalDialog("modularFramer.do?src=" + srcStr,
			window.parent.frames[1],
			"dialogHeight:340px; dialogWidth:400px; status:no; help:no; resizable:yes; scroll: no");
}

// Open a window with helptext
function openHelpDialog(url) {
	var w = window.open(url,
	"",
	"height=800, width=1000, menubar=true, toolbar=no, resizable=yes scrollbars=yes");
	w.opener = self;
}

//Return the value of a selected radiobutton from the radio button array
function getValueOfSelectedRadioButton(radioArray) {
	var i = 0;
	for(i=0; i<radioArray.length; i++) {
		if(radioArray[i].checked) {
			return radioArray[i].value;
		}
	}
	return null;
}

//Return the actual selected radio button from the radio button array
function getSelectedRadioButton(radioArray) {
	var i = 0;
	for(i=0; i<radioArray.length; i++) {
		if(radioArray[i].checked) {
			return radioArray[i];
		}
	}
	return null;
}

// Prints the current frame
function frameprint() {
	this.print();
}

//
// Return the decimal value of a string, or NaN if parsing failed.
// A null or empty value will be returned as 0.0.
// The string may contain spaces, sign, and either a comma or decimal point.
//
// Examples:
//
//
// Parameters:
//   str - the number as a string
//
function stringToDecimal(str) {
	if (str == null) {
		return 0.0;
	}

	var s = trimWhitespace(str);
	if (s.length == 0) {
		return 0.0;
	}

	s = s.replace(",", ".");
	return parseFloat(s, 10);
}

//
// Return a numeric value as a string, with a comma as the fraction separator
// and a space as separator between series of thousands. The value NaN is
// returned as an empty string. No rounding takes place - digits are
// simply truncated if present.
//
// Parameters:
//   n - the number
//   digits - number of fraction digits to use (trailing zeroes will be added if necessary)
//
function decimalToString(n, digits) {
	if (isNaN(n)) {
		return "";
	}
	var s = n.toString();
	s = s.replace(".", ",");
	var i = s.indexOf(",");
	if (i >= 0) {
		if (s.length - i > digits) {
			s = s.substring(0, i + digits + 1);
		}
	}

	// Add a space for each section of thousands.
	var begin = s.length - 3;
	if (i != -1) {
		begin = i - 3;
	}
	for (i = begin; i > 0; i -= 3) {
		s = s.substring(0, i) + " " + s.substring(i);
	}

	var count = 2;
	var index = s.indexOf(",");
	if (index != -1) {
		count = digits - (s.length - (index + 1));
	} else if (digits > 0) {
		s += ",";
	}

	for (i = 0; i < count; i++) {
		s += "0";
	}

	return s;
}

//
// Convenience function for "document.getElementsByName(s)[0]", which is
// useful for accessing elements with names containing dots (".").
//
// Parameters:
//   name - name of element
//
function getElement(name) {
	return document.getElementsByName(name)[0];
}


// Change row color to selected
function displayAsSelected(row) {
	currentRowClass = row.className;
	row.className="selectedListRow";
}

// Change row color to selected and underlined
function displayAsSelectedLink(row) {
	currentRowClass = row.className;
	row.className="selectedListRowLink";
}

// Change row color back to original (not selected)
function displayAsBefore(row) {
	row.className=currentRowClass;
}


// Block input on field when max length is reached
function blockInputOnMaxLength(field, maxLength) {
	var n = field.value;
	if (n.length >= maxLength) {
		event.returnValue = false;
	}
}


// Reload the page (complete url)
// must be used from modula dialogues.
function genericReloadPage( url ) {

	document.location.href = url;
}

//  Remove text after max length is reached
function checkMaxLength(field, maxLength) {
	var n = field.value;
	if (n.length > maxLength) {
		field.value = n.substr(0,maxLength);
	}
	return true;
}

// Used to set Focus on the body. Needed for the "Ctrl-N"-script below
function setFocusOnBody() {
	if (document.all) {
		document.body.focus();
	}
}

// To prevent the users to create a new browser instance
// in a incorrect manner. Crtl-N is not allowd when SiteMinder is used
if (typeof window.event != 'undefined')
	document.onkeydown = function()
	{
		if ((event.ctrlKey) && (event.keyCode == 78))
			alert("VARNING !! Anv�nd ej Ctrl-N i FASON Skador !\nStarta alltid en ny webbl�sare n�r du ska byta anv�ndare !");
	}

// Finns i casescript.js med...
function openShowUserInfo(userId) {

	var srcString = "showUserInfo.do?&userId=" + userId;
	srcString = escape(srcString)

	showModalDialog("modularFramer.do?src=" + srcString,
		window.parent.frames[1],
		"dialogHeight:300px; dialogWidth:400px; status:no; help:no; resizable:yes; scroll: no");
}

// Finns i casescript.js med...
function openShowUserGroupInfo(userGroupId) {
	var srcString = "showUserGroupInfo.do?&userGroupId=" + userGroupId;
	srcString = escape(srcString)
	showModalDialog("modularFramer.do?src=" + srcString,
		window.parent.frames[1],
		"dialogHeight:300px; dialogWidth:400px; status:no; help:no; resizable:yes; scroll: no");
}

// Toggle the icon and display area for product groups
function toggleDiv(img, div) {
	try {
		if (img.name == "expand") {
			img.src = COLLAPSE_GIF;
			img.name = "collapse";
			div.style.display = "inline";
		} else if (img.name == "collapse") {
			img.src = EXPAND_GIF;
			img.name = "expand";
			div.style.display = "none";
		}
	} catch (ex) {
		alert('error ' + ex.error);
	}
}

function openDevTools() {
	var arg = new Array(3);
	arg[0] = window.parent.frames[1];

	window.open("devTools.do");
}

function openViewSql(caseId) {
	var arg = new Array(3);
	arg[0] = window.parent.frames[1];
	if (caseId==null) {
		window.open("jsp/system/viewSql.jsp");
	} else {
		window.open("jsp/system/viewSql.jsp?preSql=case%20"+caseId);
	}
}

function openVersion() {
	window.open("version.jsp");
}

function checkSearchString(searchString) {
	if (searchString.indexOf('version')>=0) {
		openVersion();
		return false;
	} else if (searchString.indexOf('devTools')>=0) {
		openDevTools();
		return false;
	} else if (searchString.indexOf('viewSql')>=0) {
		if (searchString.length==13) {
			openViewSql(searchString.substring(0,6));
			return false;
		} else {
			openViewSql(null);
			return false;
		}
	} else {
		return true;
	}
}

function fixSearchString(str) {
	str = str.replace("devTools","");
	str = str.replace("viewSql","");
	str = str.replace("version","");
	return str;
}


//Remove spaces from a string
function trim(str) {
	return str.replace(/^\s+|\s+$/g,"");
}

function removeSpacesAndReplaceCommaWithDot(str) {
	str = str.replace(",", ".").replace("&nbsp;", "");
	str = trim(str);
	return str;
}



/***********************************************
* Dynamic Ajax Content- � Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

var bustcachevar=1 //bust potential caching of external pages after initial request? (1=yes, 0=no)
var loadedobjects=""
var rootdomain="http://"+window.location.hostname
var bustcacheparameter=""

function ajaxpage(url, containerid){
var page_request = false
if (window.XMLHttpRequest) // if Mozilla, Safari etc
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
}
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.onreadystatechange=function(){
loadpage(page_request, containerid)
}
if (bustcachevar) //if bust caching of external page
bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
page_request.open('GET', url+bustcacheparameter, true)
page_request.send(null)
}

function loadpage(page_request, containerid){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
document.getElementById(containerid).innerHTML=page_request.responseText
}

function loadobjs(){
if (!document.getElementById)
return
for (i=0; i<arguments.length; i++){
var file=arguments[i]
var fileref=""
if (loadedobjects.indexOf(file)==-1){ //Check to see if this object has not already been added to page before proceeding
if (file.indexOf(".js")!=-1){ //If object is a js file
fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", file);
}
else if (file.indexOf(".css")!=-1){ //If object is a css file
fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", file);
}
}
if (fileref!=""){
document.getElementsByTagName("head").item(0).appendChild(fileref)
loadedobjects+=file+" " //Remember this object as being already added to page
}
}
}



