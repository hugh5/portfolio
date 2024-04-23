function loadNav() {
    // Colour the active nav item
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "" || page == "index.html") {
        page = ".";
    }
    $("nav a").each(function () {
        var href = $(this).attr("href");
        if (page == href) {
            $(this).addClass("active");
        }
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

function setContent(projectname) {
    let dots = "";
    for (let i = 0; i < counts[projectname]; i++) {
        if (i === counter[projectname]) {
            $(`#${projectname} > :nth-child(${i + 1})`).animate(
                {
                    opacity: 1,
                },
                500
            );
        } else {
            $(`#${projectname} > :nth-child(${i + 1})`).animate(
                {
                    opacity: 0,
                },
                250
            );
        }
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
            counter[projectname] = counts[projectname] - 1;
        } else {
            counter[projectname]--;
        }
        setContent(projectname);
    });

    $(".right-arrow").on("click", function () {
        let projectname = $(this).parent().attr("id");
        if (counter[projectname] === counts[projectname] - 1) {
            counter[projectname] = 0;
        } else {
            counter[projectname]++;
        }
        setContent(projectname);
    });
}

let counter = {};
let counts = {};

$(function () {
    loadNav();

    const numProjects = $('[id^="project"').not("#projects").length;
    for (let i = 1; i <= numProjects; i++) {
        counter[`project${i}`] = 0;
    }

    for (let i = 1; i <= numProjects; i++) {
        counts[`project${i}`] = $(`#project${i} > .content`).length;
    }
    loadImageSliders();
});
