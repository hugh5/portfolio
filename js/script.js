function loadNav() {
    // Determine the current page
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "" || page == "index.html") {
        page = ".";
    }

    // Highlight the active nav item based on the current page
    $("nav > .menu-item").each(function () {
        var href = $(this).attr("href");
        if (page == href) {
            $(this).addClass("active");
        }
    });

    // Show/hide the nav menu on mobile using the menu image
    $("nav > .menu-image").on("click", function () {
        $("nav > .menu-item").slideToggle(150);
    });

    // Show the nav menu when the window is resized
    $(window).resize(function () {
        if ($(window).width() > 800) {
            $("nav > .menu-item").show();
        } else {
            $("nav").show();
        }
    });

    // On scroll, hide/show the navbar
    var lastScroll = 0;
    $(window).scroll(function (event) {
        // Current scroll position
        var current = $(this).scrollTop();
        // Maximum scroll position
        var scrollMax = window.document.body.scrollHeight - window.innerHeight;
        // If the current scroll position is near the top or
        // the scroll direction is up and not past the bottom, show the navbar
        // Otherwise, if the scroll direction is down, hide the navbar
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
    // Interactive Image slideshow page indicators (dots below the image)
    let dots = "";
    // For each image in the project, only show the image at the current counter index
    for (let i = 0; i < counts[projectname]; i++) {
        // Show the image at the current counter index (opacity 1)
        // Hide all other images (opacity 0)
        if (i === counter[projectname]) {
            // Grab the image at the current counter index and animate it to show
            $(`#${projectname} > :nth-child(${i + 1})`).animate(
                {
                    opacity: 1,
                },
                500
            );
        } else {
            // Hide all other images
            $(`#${projectname} > :nth-child(${i + 1})`).animate(
                {
                    opacity: 0,
                },
                250
            );
        }
        // Generate the html for the dots below the image
        dots += `<span class="dot ${
            i === counter[projectname] ? "active" : ""
        }"></span>`;
    }
    // Set the html for the dots below the image
    $(`#${projectname} .dots`).html(dots);
    // Add click event listeners to the dots to change the image
    $(`#${projectname} .dot`).on("click", function () {
        // Update the counter to the index of the clicked dot
        counter[projectname] = $(this).index();
        // Animate the image to show
        setContent(projectname);
    });
}

function loadImageSliders() {
    // For each project, set the content for the first image
    for (let projectname in counter) {
        setContent(projectname);
    }

    // Add click event listeners to the left and right arrows
    // On click left arrow, decrement the counter and set the content
    $(".left-arrow").on("click", function () {
        // Grab the project name from the parent element's id
        let projectname = $(this).parent().attr("id");
        // Decrement the index
        if (counter[projectname] === 0) {
            counter[projectname] = counts[projectname] - 1;
        } else {
            counter[projectname]--;
        }
        // Set the content for the new index
        setContent(projectname);
    });
    // On click right arrow, increment the counter and set the content
    $(".right-arrow").on("click", function () {
        // Grab the project name from the parent element's id
        let projectname = $(this).parent().attr("id");
        // Increment the index
        if (counter[projectname] === counts[projectname] - 1) {
            counter[projectname] = 0;
        } else {
            counter[projectname]++;
        }
        // Set the content for the new index
        setContent(projectname);
    });
}

// Holds the current index for each project
let counter = {};
// Holds the maximum index for each project
let counts = {};

$(function () {
    loadNav();

    // Initialize the index to 0 for each project
    const numProjects = $('[id^="project"').not("#projects").length;
    for (let i = 1; i <= numProjects; i++) {
        counter[`project${i}`] = 0;
    }
    // Initialize the max index for each project
    for (let i = 1; i <= numProjects; i++) {
        counts[`project${i}`] = $(`#project${i} > .content`).length;
    }
    loadImageSliders();
});
