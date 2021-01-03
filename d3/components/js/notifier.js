function notifier(titleTxt, contentTxt, duration = 4) {
    let notifier = document.createElement("div");
    notifier.setAttribute("class", "notifier");

    let title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent = titleTxt;

    let content = document.createElement("div");
    content.setAttribute("class", "content");
    content.textContent = contentTxt;

    notifier.appendChild(title);
    notifier.appendChild(content);

    notifier.style.cssText = "right:0px;opacity:0";

    document.body.appendChild(notifier);

    setTimeout(function () {
        notifier.style.cssText = "top:20px;right:20px;opacity:1";
    }, 50);

    setTimeout(function () {
        notifier.style.cssText = "top:40px;opacity:0;right:20px;";
        setTimeout(function () {
            notifier.remove();
        }, (duration + .1) * 1050);
    }, duration * 1050);
}