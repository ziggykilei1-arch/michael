// Home
function welcome() {
    console.log("Welcome to my Portfolio website!");
}

// About
function showMessage() {
    const el = document.getElementById("about-message");
    if (el) {
        el.textContent = "I enjoy creating websites, solving electrical problems, and learning new technologies.";
    }
}

// Skills
function displaySkills() {
    const skills = [
        "Electrical Circuit Design",
        "Troubleshooting",
        "Automation",
        "HTML",
        "CSS",
        "JavaScript",
        "Git"
    ];
    const skillsList = document.getElementById("skills-list");
    if (!skillsList) return;
    skillsList.innerHTML = "";
    skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });
}

// Projects
function displayProjects() {
    const projects = [
        {
            title: "Personal Portfolio Website",
            description: "A responsive portfolio site showcasing my skills and projects."
        },
        {
            title: "Restaurant Website",
            description: "A responsive website built for a local restaurant."
        }
    ];
    const projectsList = document.getElementById("projects-list");
    if (!projectsList) return;
    projectsList.innerHTML = "";
    projects.forEach(project => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${project.title}</strong><p>${project.description}</p>`;
        projectsList.appendChild(li);
    });
}

// Contact form validation & submit
function validateForm() {
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const feedback = document.getElementById("form-feedback");

    if (!name || !email || !message) {
        if (feedback) feedback.textContent = "Please complete your name, email, and message.";
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        if (feedback) feedback.textContent = "Please enter a valid email address.";
        return false;
    }

    if (feedback) feedback.textContent = "";
    return true;
}

function scrollToContact() {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

function toggleAboutDetails() {
    const el = document.getElementById("about-message");
    if (!el) return;

    if (el.textContent) {
        el.textContent = "";
        document.getElementById("about-show-btn").textContent = "Show more";
    } else {
        el.textContent = "I enjoy building websites, solving electrical problems, and learning new technologies that make work more efficient.";
        document.getElementById("about-show-btn").textContent = "Show less";
    }
}

function updateYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    displaySkills();
    displayProjects();
    updateYear();

    document.getElementById("contact-btn")?.addEventListener("click", scrollToContact);
    document.getElementById("about-show-btn")?.addEventListener("click", toggleAboutDetails);

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (!validateForm()) return;

            const feedback = document.getElementById("form-feedback");
            if (feedback) feedback.textContent = "Thanks — your message was received.";
            form.reset();
        });
    }
});