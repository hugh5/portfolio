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

let counter = {
    project1: 0,
    project2: 0,
    project3: 0,
    project4: 0,
    project5: 0,
};

const images = {
    project1: [
        "/images/timetable/1.png",
        "/images/timetable/2.png",
        "/images/timetable/3.png",
        "/images/timetable/4.png",
        "/images/timetable/5.png",
        "/images/timetable/6.png",
    ],
    project2: [
        "/images/pathfinding/1.png",
        "/images/pathfinding/2.png",
        "/images/pathfinding/3.png",
    ],
    project3: [
        "/images/sorting/1.png",
        "/images/sorting/2.png",
        "/images/sorting/3.png",
    ],
    project4: [
        "/images/neuralnetwork/1.jpg",
        "/images/neuralnetwork/2.jpg",
        "/images/neuralnetwork/3.jpg",
        "/images/neuralnetwork/4.jpg",
    ],
    project5: [
        "/images/snake/1.gif",
        "/images/snake/2.jpg",
        "/images/snake/3.jpg",
    ],
};

function setContent(projectname) {
    let selector = `#${projectname} > .content`;
    $(selector).fadeOut(200, function () {
        $(selector).attr("src", images[projectname][counter[projectname]]);
        $(selector).fadeIn(200);
    });
    let dots = "";
    for (let i = 0; i < images[projectname].length; i++) {
        dots += `<span class="dot ${
            i === counter[projectname] ? "active" : ""
        }"></span>`;
    }
    $(`#${projectname} .dots`).html(dots);
    $(`#${projectname} .dot`).on("click", function () {
        counter[projectname] = $(this).index();
        setContent(projectname);
    });
}

function loadImageSliders() {
    for (let projectname in counter) {
        setContent(projectname);
    }

    $(".left-arrow").on("click", function () {
        let projectname = $(this).parent().attr("id");
        if (counter[projectname] === 0) {
            counter[projectname] = images[projectname].length - 1;
        } else {
            counter[projectname]--;
        }
        setContent(projectname);
    });

    $(".right-arrow").on("click", function () {
        let projectname = $(this).parent().attr("id");
        if (counter[projectname] === images[projectname].length - 1) {
            counter[projectname] = 0;
        } else {
            counter[projectname]++;
        }
        setContent(projectname);
    });
}

$(function () {
    loadNav();
    loadFooter();
    loadImageSliders();
});
