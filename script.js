
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
    "#homepageID, #aboutMeID, #servicesID, #toolsID, #projectsID, #experienceID, #contactID"
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


/* =========================
   Contact Form
   ========================= */

const contactForm = document.querySelector("#contactForm");
const contactFormStatus = document.querySelector("#contactFormStatus");

if (contactForm && contactFormStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#contactName")?.value.trim();
        const email = document.querySelector("#contactEmail")?.value.trim();
        const subject = document.querySelector("#contactSubject")?.value.trim();
        const message = document.querySelector("#contactMessage")?.value.trim();

        if (!name || !email || !subject || !message) {
            contactFormStatus.textContent =
                "Please fill in all fields.";
            return;
        }

        const recipient = "chankishiannn@gmail.com";
        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        const mailtoLink =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

        contactFormStatus.textContent =
            "Opening your email application. Please send the prepared email to complete delivery.";

        window.location.href = mailtoLink;
    });
}
