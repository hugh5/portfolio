function loadNav() {
    // Load the navbar
    $("header").load("_navbar.html", function () {
        // Colour the active nav item
        var path = window.location.pathname;
        var page = path.split("/").pop();
        if (page == "" || page == "index.html") {
            page = "/";
        }
        $("nav a").each(function () {
            var href = $(this).attr("href");
            if (page == href) {
                $(this).addClass("active");
            }
        });
    });

    // Load the footer

    // On scroll, hide/show the navbar
    var lastScroll = 0;
    $(window).scroll(function (event) {
        var current = $(this).scrollTop();
        var scrollMax = window.document.body.scrollHeight - window.innerHeight;
        if (current < 20 || (current < lastScroll && current < scrollMax)) {
            // Scroll up, show the navbar
            $("nav").show(150);
        } else if (current > lastScroll) {
            // Scroll down, hide the navbar
            $("nav").hide(150);
        }
        lastScroll = current;
    });
}

function loadFooter() {
    $("footer").load("_footer.html");
}

$(function () {
    loadNav();
    loadFooter();
});
