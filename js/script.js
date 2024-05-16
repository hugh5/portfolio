/**
 * Sets the appearance of the page to light mode
 */
function setLightMode() {
    // Set the theme attribute to light
    $("body").attr("data-theme", "light");
    // Change the theme icon to the light theme icon
    $(".theme-icon").attr("src", "images/light-theme.png");
    // Save the theme to local storage
    window.localStorage.setItem("data-theme", "light");
}

/**
 * Sets the appearance of the page to dark mode
 */
function setDarkMode() {
    // Set the theme attribute to dark
    $("body").attr("data-theme", "dark");
    // Change the theme icon to the dark theme icon
    $(".theme-icon").attr("src", "images/dark-theme.png");
    // Save the theme to local storage
    window.localStorage.setItem("data-theme", "dark");
}

/**
 * Toggle the theme between light and dark mode
 */
function toggleTheme() {
    if (isLightMode) {
        // If the current theme is light, set the dark theme
        setDarkMode();
    } else {
        // If the current theme is dark, set the light theme
        setLightMode();
    }
    // Toggle the theme variable
    isLightMode = !isLightMode;
}

/**
 * Load the theme toggle based on the current theme
 */
function loadThemeToggle() {
    if (isLightMode) {
        setLightMode();
    } else {
        setDarkMode();
    }
}

/**
 * Performs the following actions when the page is loaded:
 * 1. Highlight the current page in the nav menu
 * 2. Show/hide the nav menu on mobile using a button
 */
function loadNav() {
    // Determine the current page
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "" || page == ".") {
        page = "index.html";
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
        $("nav > .menu-item").slideToggle(200);
    });
}

/**
 * Perform the following actions when the page is scrolled:
 * 1. Add event listener to make sure the navbar is shown when the window is resized
 * 2. Add event listener to show/hide the navbar and theme toggle on scroll
 */
function loadScrollBehavior() {
    // Show the nav menu when the window is resized
    $(window).resize(function () {
        if (window.innerWidth > 800) {
            $("nav").show();
            $("nav > .menu-item").show();
        } else {
            $("nav").show();
            $("nav > .menu-item").hide();
        }
    });

    // On scroll, hide/show the navbar and theme toggle
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
            $("nav").fadeIn(150);
            $(".theme-button").fadeIn(150);
        } else if (current > lastScroll) {
            // Scroll down, hide the navbar
            $("nav").fadeOut(350);
            $(".theme-button").fadeOut(350);
        }
        lastScroll = current;
    });
}

/**
 * Update the image slider for the given project
 * Shows the image at the current counter index and hides all other images
 * @param {string} projectname - The name of the project
 */
function updateSlider(projectname) {
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
                    zIndex: 1,
                },
                500
            );
        } else {
            // Hide all other images
            $(`#${projectname} > :nth-child(${i + 1})`).animate(
                {
                    opacity: 0,
                    zIndex: 0,
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
        updateSlider(projectname);
    });
}

/**
 * Perform the following actions when the page is loaded:
 * 1. Set the content for the first image for each project
 * 2. Add click event listeners to the left and right arrows to change the image
 */
function loadImageSliders() {
    // For each project, set the content for the first image
    for (let projectname in counter) {
        updateSlider(projectname);
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
        updateSlider(projectname);
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
        updateSlider(projectname);
    });
}

/**
 * Add click event listeners to the cards on the Testimonials page
 * to show the testimonial for the clicked card
 */
function loadTestimonials() {
    // Add click event listeners to the cards
    $("#testimonials .card").each(function () {
        // On click, show the testimonial for the clicked card
        // Hide the testimonial for the other cards
        $(this).on("click", function () {
            let id = $(this).attr("testimonial_id");
            // Remove the active class for the other cards
            $("#testimonials .card").not(this).removeClass("active");
            $("p.testimonial").not(`p[testimonial_id="${id}"]`).slideUp(300);

            // Add the active class for the clicked card
            $(this).addClass("active");
            $(`p[testimonial_id="${id}"]`).slideDown(300);
        });
    });
    $("#testimonials .card").first().addClass("active");
    $("p.testimonial").first().show();
}

// Holds the current theme mode
let isLightMode = window.localStorage.getItem("data-theme") === "light";

// Holds the current index for each project
let counter = {};
// Holds the maximum index for each project
let counts = {};

$(function () {
    loadThemeToggle();
    loadNav();
    loadScrollBehavior();

    // Initialize the index to 0 for each project
    const numProjects = $('[id^="project"').not("#projects").length;
    for (let i = 1; i <= numProjects; i++) {
        counter[`project${i}`] = 0;
    }
    // Initialize the max index for each project
    for (let i = 1; i <= numProjects; i++) {
        counts[`project${i}`] = $(`#project${i} > .content`).length;
    }
    // Projects page
    loadImageSliders();
    // Testimonials page
    loadTestimonials();
});
