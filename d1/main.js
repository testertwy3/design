function $(selector) {
    return document.querySelectorAll(selector);
}

if(document.querySelectorAll(".header-container")[0]) {
    document.querySelectorAll(".header")[0].style.height = window.innerHeight+"px";
    window.addEventListener("resize", function() {
        document.querySelectorAll(".header")[0].style.height = window.innerHeight+"px";
    })
}

for(i=0;i<$(".ourteam .card").length;i++) {

    $(".ourteam .card")[i].addEventListener("mouseover", function() {
        this.querySelector(".img").style.cssText = "opacity:.5";
        this.querySelector(".info").style.height = this.querySelector(".info").scrollHeight+"px";
    });

    $(".ourteam .card")[i].addEventListener("mouseleave", function() {
        this.querySelector(".img").style.cssText = "";
        this.querySelector(".info").style.height = "0px";
    });

}


var t,c;
function scrolling(selector) {
    if( selector.scrollTop <= selector.scrollHeight-selector.offsetHeight-1) {
        console.log(selector.scrollTop);
        selector.scrollTop = selector.scrollTop + 50;
    } else {
        clearTimeout(t);
    }
    t = setTimeout(function() {scrolling(selector)}, 50);  

}

for(i=0;i<$(".portfolio .card").length;i++) {

    $(".portfolio .card")[i].addEventListener("mouseover", function() { 
        startScroll();
    });
    
    $(".portfolio .card")[i].addEventListener("mouseleave", function() {
        stopScroll();
    });

}

i = 0;
var speed = 1,t=null;

function startScroll(){

    for(i=0;i<$(".portfolio .card").length;i++) {
        $(".portfolio .card")[i].style.overflowY="hidden";
    }
    scroll();

}

function stopScroll(){
    clearTimeout(t);
    for(i=0;i<$(".portfolio .card").length;i++) {
        $(".portfolio .card")[i].style.overflowY="scroll";
    }
}

function scroll() {
    i = i + speed;
    for(i=0;i<$(".portfolio .card").length;i++) {
        $(".portfolio .card")[i].scrollTop = i;
        if (i > $(".portfolio .card")[i].scrollHeight - 160) { i = 0; }
        t = setTimeout("scroll()", 100);
    }
}
