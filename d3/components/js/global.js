function ready(param) {
    window.addEventListener("load", param());
}

function $(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (e) {
        console.log(e.message);
    }
}

function $$(selector) {
    return document.querySelector(selector);
}

function on(selector = "", selectedEvent = "", callback = "") {
    selector.addEventListener(selectedEvent, callback);
}

function getTimestamp() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}

function resize(param) {
    param();
    window.addEventListener("resize", function (e) {
        param();
    });
}

function each(selector, callback) {
    if (selector != undefined) {
        for (let c = 0; c < selector.length; c++) {
            callback(selector[c]);
        }
    }
}

function attr(get = "", set = "") {
    if (get != "") {

    }
}

function trigger() {

}