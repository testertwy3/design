function style(start = true, selector, cssStart, cssEnd, duration) {
    selector.style.transition = "ease-in-out " + duration + 's';
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
        style(start, selector, "transform:translateY(20%);opacity:0;", "transform:translateY(0%);opacity:1", duration);
    } else if (direction == "left") {
        style(start, selector, "transform:translateX(-20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    } else if (direction == "right") {
        style(start, selector, "transform:translateX(20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    } else {
        style(start, selector, "transform:translateY(20%);opacity:0;", "transform:translateY(0%);opacity:1;", duration);
    }
}

// animator({ start: true, selector: sel, effect: eff = "fade", duration: dur = .5, direction: dir = "top" });

function animator({ start: startEnd = true, selector: sel, effect: eff = "fade", duration: dur = .5, direction: dir = "top" }) {
    // console.log(sel + " - " + eff + " - " + dur + " - " + dir);
    if (eff == "slide") {
        slide(startEnd, sel, dir, dur);
    } else {
        fade(startEnd, sel, dur);
    }
}