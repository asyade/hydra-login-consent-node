/// Improve the user experience by removing some useless hisory informations (so when you fail login and press back button you will be redirected on the previous page not the same page again and again ...)
var replace_back = null
    (function (window, location) {
        history.replaceState(null, document.title, location.pathname + "#!/stealingyourhistory");
        history.pushState(null, document.title, location.pathname);

        window.addEventListener("popstate", function () {
            if (location.hash === "#!/stealingyourhistory") {
                history.replaceState(null, document.title, location.pathname);
                setTimeout(function () {
                    if (replace_back != null) {
                        location.replace(replace_back);
                    }
                }, 0);
            }
        }, false);
    }(window, location));
