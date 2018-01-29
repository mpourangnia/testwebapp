navigator.progresswarn = "Systemet �r upptaget";
var progressEnd = 9;		// set to number of progress <span>'s.
var progressInterval = 30;	// set to time between updates (milli-seconds)
var progressTimer;
var turnInterval = 300; // Use longer time between 'turns' (milli-seconds) to get a better Kit-feeling
var elementLength = 9; // Max number of high-lighted elements at the same time.
var fillFromLeftIndex = 1; // Where we are when filling from left to right
var fillFromRightIndex = progressEnd; //Where we are when filling from right to left

var coloursSkandia = ["006F53", "#CF0072", "#63305E", "#BCDC05", "#60AFDD"];
var coloursSE = ["#ffd200", "#0b5089", "#0b5089"];
var coloursDK = ["#D00C33", "#D00C33", "#F2F2F2"];
var coloursNO = ["#EF2B2D", "#002868", "#E60000", "#EF2B2D", "#F2F2F2"];
var coloursFI = ["#003580", "#003580", "#F2F2F2"];
var colours = coloursSkandia;

try {
    var now = new Date();
    // flaggdagar för Sverige, Norge, Danmark och Finland
    if (now.getMonth() === 0 && now.getDate() === 1) colours = coloursSE;
    if (now.getMonth() === 0 && now.getDate() === 28) colours = coloursSE;
    if (now.getMonth() === 2 && now.getDate() === 12) colours = coloursSE;
    if (now.getMonth() === 3 && now.getDate() === 30) colours = coloursSE;
    if (now.getMonth() === 4 && now.getDate() === 1) colours = coloursSE;
    if (now.getMonth() === 5 && now.getDate() === 6) colours = coloursSE;
    if (now.getMonth() === 6 && now.getDate() === 14) colours = coloursSE;
    if (now.getMonth() === 7 && now.getDate() === 8) colours = coloursSE;
    if (now.getMonth() === 9 && now.getDate() === 24) colours = coloursSE;
    if (now.getMonth() === 10 && now.getDate() === 6) colours = coloursSE;
    if (now.getMonth() === 11 && now.getDate() === 10) colours = coloursSE;
    if (now.getMonth() === 11 && now.getDate() === 23) colours = coloursSE;
    if (now.getMonth() === 11 && now.getDate() === 25) colours = coloursSE;
    if (now.getMonth() === 4 && now.getDate() === 17) colours = coloursNO; // sjuttonde maj (norge)
    if (now.getMonth() === 5 && now.getDate() === 5) colours = coloursDK; // femte juni (danmark)
    if (now.getMonth() === 11 && now.getDate() === 6) colours = coloursFI;// 6 dec (finland)
} catch (ex) {
}

var blendTarget = 25.0;
var blend = 0.0;
var progressAt;
var progressDirection;

function get_random() {
    return colours[Math.floor(Math.random() * colours.length)];
}

function progressClear() {
    for (var i = 1; i <= progressEnd; i++) {
        document.getElementById('progress' + i).style.backgroundColor = 'transparent';
    }
    progressAt = 1;
    progressDirection = 1;
}

function blendIn() {
    var progressBackStyle = getProgressBackStyle();
    if (blend < blendTarget) {
        blend = blend + 5;
        progressBackStyle.opacity = blend / 100.0;
        progressBackStyle.filter = "alpha(opacity=" + blend + ")";
    }
}

function blendOut() {
    var progressBackStyle = getProgressBackStyle();
    blend = 0.0;
    progressBackStyle.opacity = 0.0;
    progressBackStyle.filter = "alpha(opacity=0)";
}

function fillFromLeft() {

    blendIn();

    var reCall = 0; //If we should call this function again, 0=no, 1=yes
    var trailingIndex = fillFromLeftIndex - elementLength; //Index of the trailing 'blip'

    if (fillFromLeftIndex <= progressEnd) {
        document.getElementById('progress' + fillFromLeftIndex).style.backgroundColor = get_random();
        reCall = 1;
    }

    if (trailingIndex > 0 && fillFromLeftIndex <= progressEnd + elementLength) {
        document.getElementById('progress' + trailingIndex).style.backgroundColor = 'transparent';
        reCall = 1;
    }

    if (reCall === 0) {
        fillFromLeftIndex = 1;
        progressTimer = setTimeout('fillFromRight()', turnInterval);
    }

    if (reCall === 1) {
        fillFromLeftIndex++;
        progressTimer = setTimeout('fillFromLeft()', progressInterval);
    }
}

function fillFromRight() {

    var reCall = 0;
    var trailingIndex = fillFromRightIndex + elementLength;
    if (fillFromRightIndex >= 1) {
        document.getElementById('progress' + fillFromRightIndex).style.backgroundColor = get_random();
        reCall = 1;
    }

    if (trailingIndex <= progressEnd && fillFromRightIndex + elementLength > 0) {
        document.getElementById('progress' + trailingIndex).style.backgroundColor = 'transparent';
        reCall = 1;
    }

    if (reCall === 0) {
        fillFromRightIndex = progressEnd;
        progressTimer = setTimeout('fillFromLeft()', turnInterval);
    }

    if (reCall === 1) {
        fillFromRightIndex--;
        progressTimer = setTimeout('fillFromRight()', progressInterval);
    }
}

function progressUpdate() {
    fillFromLeft();
}

function progressStop() {
    progressUnLock();
    clearTimeout(progressTimer);
    progressClear();

    var progressBarStyle = getProgressBarStyle();
    var progressBackStyle = getProgressBackStyle();
    progressBarStyle.display = 'none';
    progressBackStyle.display = 'none';

    try {
        window.parent.frames[2].rightFrameClose();
    } catch (ex) {
        // Do nothing
    }
}

function progressCreate() {
    var progressBar = getProgressBar();
    var progressBarStyle = getProgressBarStyle();
    var progressBackStyle = getProgressBackStyle();

    blendOut();
    progressBackStyle.position = 'absolute';
    progressBackStyle.display = 'inline';
    progressBackStyle.left = document.body.scrollLeft;
    progressBackStyle.top = document.body.scrollTop;
    progressBackStyle.width = document.body.clientWidth;
    progressBackStyle.height = document.body.clientHeight;

    progressBarStyle.position = 'absolute';
    progressBarStyle.display = 'inline';
    progressBarStyle.left = document.body.scrollLeft + (document.body.clientWidth / 2) - (progressBar.offsetWidth / 2);
    progressBarStyle.top = document.body.scrollTop + (document.body.clientHeight / 2) - (progressBar.offsetHeight / 2);
}

function isLocked() {
    return navigator.runstatus9823 === true;
}

function progressLock() {
    if (progressBusy()) return true;
    navigator.runstatus9823 = true;
    return false;
}

function progressUnLock() {
    navigator.runstatus9823 = false;
}

function progressStart() {
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        return;
    }

    if (progressLock() === true) return false;
    progressCreate();
    progressClear();
    progressUpdate();
    return true;

}

function progressBusy() {
    if (isLocked()) {
        alert(navigator.progresswarn);
        return true;
    }
    return false;
}

function getProgressBar() {
    return document.getElementById("progressbar");
}

function getProgressBack() {
    return document.getElementById("progressback");
}

function getProgressBarStyle() {
    return getProgressBar().style;
}

function getProgressBackStyle() {
    return getProgressBack().style;
}
