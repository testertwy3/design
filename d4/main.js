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


function isInt(val) {
    val = val.trim();
    var ret = true;
    for (let i = 0; i < val.length; i++) {
        if (val[i].charCodeAt() <= 48 || val[i].charCodeAt() >= 57) {
            ret = false;
        }
    }
    return ret;
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

function getParent(child, parentOf) {
    while (true) {
        if (child.querySelector(parentOf) != undefined || (child.querySelector("body") != null && child.querySelector("body") != undefined)) {
            return child;
        }
        child = child.parentElement;
    }
}

function attr(get = "", set = "") {
    if (get != "") {

    }
}

function trigger() {

}

function style(start = true, selector, cssStart, cssEnd, duration) {
    // if (start) {
    //     selector.style.transition = "ease-in-out 0s";
    // } else {
    selector.style.transition = "ease-in-out " + duration + 's';
    // }
    if (start) {
        selector.style.cssText += cssStart;
    } else {
        setTimeout(function () {
            selector.style.cssText += cssEnd;
        }, duration * 1000);
    }
}

function fade(start, selector, duration = .5) {
    style(start, selector, "opacity:0", "opacity:1", duration);
}

function slide(start, selector, direction = "top", duration = .5) {
    selector.parentElement.style.overflow = "hidden";
    if (direction == "bottom") {
        style(start, selector, "transform:translateY(20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    } else if (direction == "left") {
        style(start, selector, "transform:translateX(-20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    } else if (direction == "right") {
        style(start, selector, "transform:translateX(20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    } else {
        style(start, selector, "transform:translateY(20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    }
}

function scale(start, selector, duration = .5) {
    style(start, selector, ";transform:scale(.5);opacity:0;", ";transform:scale(1);opacity:1;", duration);
}

// animator({ start: true, selector: sel, effect: eff = "fade", duration: dur = .5, direction: dir = "top" });

function animator({ start: startEnd = true, selector: sel, effect: eff = "fade", duration: dur = .5, direction: dir = "top" }) {
    if (eff == "slide") {
        slide(startEnd, sel, dir, dur);
    } else if (eff == "scale") {
        scale(startEnd, sel, dur);
    } else {
        fade(startEnd, sel, dur);
    }
}

function slider(sliderName) {

    if (sliderName === undefined) {
        console.log("undefined slider element")
        return;
    }

    let active = 0;

    function slidesDeactivate() {
        for (let c = 0; c < sliderName.querySelectorAll(".slide").length; c++) {
            sliderName.querySelectorAll(".slide")[c].style.display = "none";
        }
    }

    function slideSwitch(direction = true) {
        let slideCount = sliderName.querySelectorAll(".slide").length;
        if (direction) {
            if (sliderName.querySelectorAll(".slide").length - 1 > active) {
                active += 1;
            } else {
                active = 0;
            }
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: "slide", duration: .5, direction: "right" });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "right" });
        } else {
            if (active > 0) {
                active -= 1;
            } else {
                active = slideCount - 1;
            }
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "left" });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: 'slide', "duration": .5, direction: "left" });
        }
        dotSwitch(active);
        sliderName.querySelectorAll(".slide")[active].style.display = "block";
    }

    function createDots() {
        let slideCount = sliderName.querySelectorAll(".slide").length;
        let dot;
        for (let i = 0; i < slideCount; i++) {
            dot = document.createElement("span");
            dot.setAttribute("class", "dot");
            sliderName.querySelectorAll(".dots")[0].appendChild(dot);
        }
        return true;
    }

    if (createDots()) {

        function dotSwitch(active) {
            slidesDeactivate();
            for (let i = 0; i < sliderName.querySelectorAll(".dot").length; i++) {
                sliderName.querySelectorAll(".dot")[i].setAttribute("class", "dot");
            }
            sliderName.querySelectorAll(".slide")[active].style.display = "block";
            sliderName.querySelectorAll(".dots .dot")[active].setAttribute("class", "dot active");
            animator({ selector: sliderName.querySelectorAll(".slide")[active], effect: "fade", duration: .5 });
            animator({ start: false, selector: sliderName.querySelectorAll(".slide")[active], effect: "fade", duration: .5 });
        }

        dotSwitch(active);

        for (let i = 0; i < sliderName.querySelectorAll(".dots .dot").length; i++) {
            sliderName.querySelectorAll(".dots .dot")[i].addEventListener("click", function () {
                dotSwitch(i);
            });
        }

    }

    sliderName.querySelector(".slider-btn.right").addEventListener("click", function () {
        slidesDeactivate();
        slideSwitch();
    });

    sliderName.querySelector(".slider-btn.left").addEventListener("click", function () {
        slidesDeactivate();
        slideSwitch(false);
    });

}

function accordion(accordion) {

    if (accordion == undefined) {
        console.log("undefined accordion");
        return;
    }

    function deactivate() {
        let a = $(".accordion");
        for (let i = 0; i < a.length; i++) {
            a[i].querySelector(".title").setAttribute("class", "title");
            a[i].querySelector(".content").style.cssText = "height:0px;padding:0";
            a[i].querySelector(".icon").textContent = "-";
        }
    }

    deactivate();

    accordion.querySelector(".title").addEventListener("click", function () {
        let content = accordion.querySelector(".content");
        let icon = this.querySelector(".icon");

        deactivate();

        if (this.getAttribute("class").indexOf("active") == -1) {
            icon.textContent = "+";
            this.setAttribute("class", "title active");
            content.style.cssText = "height:" + (content.scrollHeight) + "px;padding:0px 10px";
        } else {
            this.setAttribute("class", "title");
            content.style.cssText = "height:0px;padding:0";
            icon.textContent = "-";
        }
    });

}


function placeholderEffect(selector) {
    if (selector.querySelector(".input-form input") != undefined) {
        if (selector.querySelectorAll(".input-form input")[0]) {
            for (i = 0; i < selector.querySelectorAll(".input-form input").length; i++) {
                if (selector.querySelectorAll(".input-form input")[i].value == "") {
                    selector.querySelectorAll(".input-form input")[i].parentElement.querySelector("label").style.cssText = "left:50%;font-size:20px;transform:translate(-50%);top:20%;color:#fff;opacity:.4";
                } else {
                    selector.querySelectorAll(".input-form input")[i].parentElement.querySelector("label").style.cssText = "left:0;transform:translate(0);opacity:1;top:0%;font-size:15px;font-weight:bolder;color:#fff";
                }

                selector.querySelectorAll(".input-form label")[i].onclick = function () {
                    this.parentElement.querySelector("input").focus();
                };

                selector.querySelectorAll(".input-form input")[
                    i
                ].onfocus = function () {
                    this.parentElement.querySelector("label").style.cssText =
                        "opacity:1;left:0;transform:translate(0);top:0%;font-size:15px;font-weight:bolder";
                };

                selector.querySelectorAll(".input-form input")[
                    i
                ].onblur = function () {
                    if (this.value == "") {
                        this.parentElement.querySelector(
                            "label"
                        ).style.cssText =
                            "opacity:.4;left:50%;font-size:20px;transform:translate(-50%);top:20%";
                    } else {
                        this.parentElement.querySelector(
                            "label"
                        ).style.cssText =
                            "opacity:1;left:0;transform:translate(0);top:0%;font-size:15px;font-weight:bolder";
                    }
                };
            }
        }
    }
}

function lazyScroll(selector, ifTrue = "", ifFalse = "", test = false) {
    if (test) {
        console.log(selector.offsetTop - selector.scrollHeight + " - " + window.scrollY)
    }
    if (selector.offsetTop - selector.scrollHeight <= window.scrollY) {
        ifTrue();
    } else {
        ifFalse();
    }
}

ready(function () {

    for (let i = 0; i < $(".accordion").length; i++) {
        accordion($(".accordion")[i]);
    }

    $(".accordion .title")[0].click();

    slider($(".slider")[0]);

    placeholderEffect($("body")[0]);

    animator({ selector: $("header img")[0], effect: "fade", duration: 0, direction: "top" });
    animator({ start: false, selector: $("header img")[0], effect: "fade", duration: .5, direction: "top" });

    animator({ selector: $("header img")[0], effect: "fade", duration: 0, direction: "top" });
    animator({ start: false, selector: $("header img")[0], effect: "fade", duration: .5, direction: "top" });

    eff = ["left", "top", "right", "bottom"];

    let rand;

    let services = $(".services .service");

    function servicesTrue() {
        for (let i = 0; i < services.length; i++) {
            rand = Math.floor(Math.random() * 4);
            animator({ start: false, selector: services[i], effect: "slide", direction: eff[rand], duration: .5 });
        }
    }

    function servicesFalse() {
        for (let i = 0; i < services.length; i++) {
            rand = Math.floor(Math.random() * 4);
            animator({ selector: services[i], effect: "slide", direction: eff[rand], duration: .5 });
        }
    }


    let cards = $(".pricing .card");
    function cardsTrue() {
        for (let i = 0; i < cards.length; i++) {
            animator({ start: false, selector: cards[i], effect: "slide", direction: eff[i], duration: .5 });
        }
    }

    function cardsFalse() {
        for (let i = 0; i < cards.length; i++) {
            rand = Math.floor(Math.random() * 4);
            animator({ selector: cards[i], effect: "slide", direction: eff[i], duration: .5 });
        }
    }

    let items = $(".about .item");
    function itemsTrue() {
        for (let i = 0; i < items.length; i++) {
            animator({ start: false, selector: items[i], effect: "slide", direction: eff[i], duration: .5 });
        }
    }

    function itemsFalse() {
        for (let i = 0; i < items.length; i++) {
            animator({ selector: items[i], effect: "slide", direction: eff[i], duration: .5 });
        }
    }

    let team = $(".team")[0];
    function teamTrue() {
        animator({ start: false, selector: team.querySelector("h2"), effect: "slide", direction: "top", duration: .5 });
        setTimeout(function () {
            animator({ start: false, selector: team.querySelector("p"), effect: "slide", direction: "top", duration: .5 });
        }, .5);
        animator({ start: false, selector: team.querySelector(".img"), effect: "scale", duration: .5 });
    }

    function teamFalse() {
        animator({ selector: team.querySelector("h2"), effect: "slide", direction: "top", duration: .5 });
        setTimeout(function () {
            animator({ selector: team.querySelector("p"), effect: "slide", direction: "top", duration: .5 });
        }, .5);
        animator({ selector: team.querySelector(".img"), effect: "scale", duration: .5 });
    }

    let contact = $(".contact")[0];
    function contactTrue() {
        animator({ start: false, selector: contact.querySelector(".image"), effect: "slide", direction: "left", duration: .5 });
        animator({ start: false, selector: contact.querySelector("img"), effect: "slide", direction: "right", duration: .5 });
    }

    function contactFalse() {
        animator({ selector: contact.querySelector(".image"), effect: "slide", direction: "left", duration: .5 });
        animator({ selector: contact.querySelector("img"), effect: "slide", direction: "right", duration: .5 });
    }

    window.addEventListener("scroll", function () {
        lazyScroll($(".services")[0], servicesTrue, servicesFalse);
        lazyScroll($(".pricing")[0], cardsTrue, cardsFalse);
        lazyScroll($(".about")[0], itemsTrue, itemsFalse);
        lazyScroll($(".team")[0], teamTrue, teamFalse);
        lazyScroll($(".contact .image")[0], contactTrue, contactFalse);
    });


})
