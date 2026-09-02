// 1. VARIABLES & DATA TYPES
const developerName = "H. Tahreem Arshad"; // String
const currentYear = 2026;                  // Number
let isAvailableForHire = true;             // Boolean

// Object
const developerProfile = {
  name: developerName,
  role: "Frontend Web Development Trainee",
  location: "Remote",
  status: "Active"
};

// Array
const initialSkills = [
  "HTML5 Structure & Semantic Tagging",
  "Basic Document Linking & Image Embedding",
  "Form Building & Input Handling",
  "Version Control with Git & GitHub"
];

// Array of Objects
const projectGoals = [
  { step: 1, title: "Master pure HTML semantics and document layout structure." },
  { step: 2, title: "Learn CSS layout techniques including Flexbox and Grid." },
  { step: 3, title: "Introduce JavaScript for dynamic page interactivity." }
];

// 2. DOM CONTENT LOADED & EVENTS
document.addEventListener("DOMContentLoaded", () => {
  console.log(`${developerProfile.name}'s profile page script loaded successfully!`);

  // Initialize interactive features
  setupDynamicWelcome();
  renderGoalsList();
  setupSkillAdder();
  setupContactFormHandler();
  setupTableHoverEffect();
});

// 3. FUNCTIONS & CONDITIONS


// Function using conditions (if/else) and DOM manipulation
function setupDynamicWelcome() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const currentHour = new Date().getHours();
  let greetingText = "";

  // Conditions based on time of day
  if (currentHour < 12) {
    greetingText = "Good Morning!";
  } else if (currentHour < 18) {
    greetingText = "Good Afternoon!";
  } else {
    greetingText = "Good Evening!";
  }

  // Create and insert element into DOM
  const greetingElement = document.createElement("p");
  greetingElement.style.fontWeight = "bold";
  greetingElement.style.color = "#4f46e5";
  greetingElement.style.marginTop = "10px";
  greetingElement.textContent = `${greetingText} Welcome to my interactive portfolio. Status: ${
    isAvailableForHire ? "Available for opportunities" : "Busy"
  }`;

  aboutSection.appendChild(greetingElement);
}

// 4. LOOPS & ARRAY METHODS

// Function demonstrating Array Method (map) and Loop (forEach)
function renderGoalsList() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  // Array method: map() to transform object data into formatted strings
  const formattedGoals = projectGoals.map(
    (goal) => `Step ${goal.step}: ${goal.title}`
  );

  // Find existing ordered list
  const orderedList = skillsSection.querySelector("ol");
  if (orderedList) {
    orderedList.innerHTML = ""; // Clear static items

    // Loop: forEach to iterate and create DOM elements
    formattedGoals.forEach((goalText) => {
      const li = document.createElement("li");
      li.textContent = goalText;
      orderedList.appendChild(li);
    });
  }
}

// 5. DOM EVENTS & INTERACTION (Adding Skills)

function setupSkillAdder() {
  const skillsSection = document.getElementById("skills");
  const unorderedList = skillsSection ? skillsSection.querySelector("ul") : null;

  if (!unorderedList) return;

  // Dynamically inject an input field and button to add new skills
  const container = document.createElement("div");
  container.style.marginTop = "15px";
  container.style.display = "flex";
  container.style.gap = "10px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add a new skill...";
  input.style.padding = "8px 12px";
  input.style.border = "1px solid #e2e8f0";
  input.style.borderRadius = "6px";
  input.style.flex = "1";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Skill";
  addBtn.type = "button";
  addBtn.style.padding = "8px 16px";
  addBtn.style.backgroundColor = "#4f46e5";
  addBtn.style.color = "white";
  addBtn.style.border = "none";
  addBtn.style.borderRadius = "6px";
  addBtn.style.cursor = "pointer";

  container.appendChild(input);
  container.appendChild(addBtn);
  unorderedList.after(container);

  // Event Listener for button click
  addBtn.addEventListener("click", () => {
    const newSkillText = input.value.trim();

    // Condition check
    if (newSkillText !== "") {
      initialSkills.push(newSkillText); // Array method: push()

      const newLi = document.createElement("li");
      newLi.textContent = newSkillText;
      unorderedList.appendChild(newLi);

      input.value = ""; // Clear input field
    } else {
      alert("Please enter a valid skill name!");
    }
  });
}

// 6. FORM HANDLING & EVENT PREVENT DEFAULT

function setupContactFormHandler() {
  const contactForm = document.querySelector("#contact form");
  if (!contactForm) return;

  // Event listener for form submission
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents page reload

    // Accessing input values from DOM
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const formData = {
      senderName: nameInput ? nameInput.value.trim() : "",
      senderEmail: emailInput ? emailInput.value.trim() : "",
      senderMessage: messageInput ? messageInput.value.trim() : ""
    };

    // Validation condition
    if (formData.senderName && formData.senderEmail && formData.senderMessage) {
      alert(`Thank you, ${formData.senderName}! Your message has been received.`);
      contactForm.reset();
    } else {
      alert("Please fill in all required fields.");
    }
  });
}

// 7. MOUSE EVENTS & STYLING

function setupTableHoverEffect() {
  const tableRows = document.querySelectorAll("tbody tr");

  // Loop through table rows to add hover listeners
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.transition = "background-color 0.2s ease";
      row.style.backgroundColor = "#e0e7ff"; // Highlight color
    });

    row.addEventListener("mouseleave", () => {
      row.style.backgroundColor = ""; // Reset to original CSS
    });
  });
}