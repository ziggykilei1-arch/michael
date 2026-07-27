// Home page
function welcome() {
    console.log("Welcome to my Portfolio website!");
}
// About page
function showmessage() {
    document.getElementById("message").innerHTML = "I enjoy creating websites, solving electrical problems, and learning new technologies.";
}
//skills page
function displaySkills() {
    const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js"];
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = "";
    skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });
}
//contact page
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return false;
    }
    return true;
}
//projects page
function displayProjects() {
    const projects = [
        {
            title: "Project 1",
            description: "Description for Project 1"
        },
        {
            title: "Project 2",
            description: "Description for Project 2"
        }
    ];

    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    projects.forEach(project => {
        const li = document.createElement("li");
        li.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        projectsList.appendChild(li);
    });
}