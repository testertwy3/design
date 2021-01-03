function requesting(req = "get", path = "/", param = "", responseElement = "", callback = false, html = false, js = false) {

    file = req.split('-').length > 1 ? true : false;
    req = req.split('-')[0];

    let xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {

            if (responseElement != "" && responseElement != undefined) {
                if (html) {
                    responseElement.innerHTML = this.response;
                } else {
                    responseElement.textContent = this.response;
                }

                eval(responseElement.querySelector("script").textContent);

            } else {
                console.log(this.response);
            }

            if (callback) {
                callback(this);
            }

        }
    }

    params = param;

    arr = ["post"];

    if (arr.indexOf(req) != -1) {
        xhr.open(req, path, 1);
        if (!file) {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        // xhr.setRequestHeader("X-CSRF-TOKEN", $("meta[name='csrf-token']").getAttribute("content"));
        xhr.send(param);
    } else {
        xhr.open(req, path + "?" + param, 1);
        // xhr.setRequestHeader("X-CSRF-TOKEN", $("meta[name='csrf-token']").getAttribute("content"));
        xhr.send();
    }

}
