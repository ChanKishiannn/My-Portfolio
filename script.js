
/* =========================
   Navbar Toggle
   ========================= */

const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarLinks = document.querySelectorAll(".navbar-menu a");

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
        const isOpen = navbarMenu.classList.toggle("active");

        navbarToggle.classList.toggle("active", isOpen);
        navbarToggle.setAttribute("aria-expanded", String(isOpen));
        navbarToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navbarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbarMenu.classList.remove("active");
            navbarToggle.classList.remove("active");

            navbarToggle.setAttribute("aria-expanded", "false");
            navbarToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}


/* =========================
   Active Navbar Highlight
   ========================= */

const sections = document.querySelectorAll(
    "#homepageID, #aboutMeID, #servicesID, #toolsID, #projectsID, #experienceID, #certificates, #contactID"
);

function updateActiveNavbar() {
    let currentSection = "homepageID";

    sections.forEach((section) => {
        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;

        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.id;
        }
    });

    navbarLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkTarget === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavbar);
window.addEventListener("load", updateActiveNavbar);

updateActiveNavbar();


/* =========================
   Project Video Preview
   ========================= */

document.querySelectorAll(".projectCard").forEach((card) => {
    const video = card.querySelector(".projectPreviewVideo");

    if (!video) return;

    card.addEventListener("mouseenter", () => {
        video.currentTime = 0;

        video.play().catch((error) => {
            console.error("Video playback failed:", error);
        });
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});


/* =============================
   Project Category Filter
   ============================= */

const projectFilters = document.querySelectorAll(".projectFilter");
const projectCards = document.querySelectorAll(".projectsGrid .projectCard");
const projectFilterCount = document.querySelector(".projectFilterCount");

if (projectFilters.length && projectCards.length) {
    function filterProjects(category) {
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const projectCategory = card.dataset.category || "other";

            const shouldShow =
                category === "all" || projectCategory === category;

            card.classList.toggle("filter-hidden", !shouldShow);

            if (shouldShow) {
                visibleCount++;
            }
        });

        // Update the number of displayed projects.
        if (projectFilterCount) {
            projectFilterCount.textContent =
                `Showing ${visibleCount} of ${projectCards.length} projects`;
        }

        // Update the selected filter button.
        projectFilters.forEach((button) => {
            const isActive = button.dataset.filter === category;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    projectFilters.forEach((button) => {
        button.addEventListener("click", () => {
            filterProjects(button.dataset.filter);
        });
    });

    // Display all projects by default.
    filterProjects("all");
}





/* =========================
   Contact Form - Formspree
   ========================= */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        let status = document.querySelector("#contactFormStatus");

        if (!status) {
            status = document.createElement("p");
            status.id = "contactFormStatus";
            status.className = "contact-form-status";
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            contactForm.appendChild(status);
        }

        status.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Message submission failed.");
            }

            status.textContent =
                "Your message was sent successfully! Thank you for contacting me.";

            contactForm.reset();
        } catch (error) {
            status.textContent =
                "Sorry, your message could not be sent. Please try again or email me directly at chankishiannn@gmail.com.";
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

