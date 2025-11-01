// F.R.E.D. Industries — Login Simulation
// Phase 3.1: Bootup Animation + Basic ID Handling (Numbers only)

const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const loginContainer = document.getElementById('login-container');
const form = document.getElementById('login-form');
const input = document.getElementById('employee-id');
const message = document.getElementById('message');

const bootLines = [
    "F.R.E.D. INDUSTRIES TERMINAL SYSTEM v0.1-2400-SP",
    "Initializing subsystems...",
    "Verifying clearance...",
    "Loading interface...",
    "STATUS: ONLINE\n\nAwaiting user input..."
];

let lineIndex = 0;

// Boot typing animation
function typeBootLine() {
    if (lineIndex < bootLines.length) {
        const line = bootLines[lineIndex];
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            bootText.textContent += line[charIndex];
            charIndex++;
            if (charIndex === line.length) {
                clearInterval(typeInterval);
                bootText.textContent += "\n";
                lineIndex++;
                setTimeout(typeBootLine, 400);
            }
        }, 40);
    } else {
        // Transition to login screen
        setTimeout(() => {
            bootScreen.style.opacity = "0";
            setTimeout(() => {
                bootScreen.style.display = "none";
                loginContainer.classList.remove("hidden");
                setTimeout(() => {
                    loginContainer.classList.add("show");
                }, 50);
            }, 800);
        }, 600);
    }
}

typeBootLine();

// Remember previous login
const savedID = localStorage.getItem('employeeID');
if (savedID) input.value = savedID;

// Restrict input to numbers and auto-format ##-###
input.addEventListener('input', () => {
    let value = input.value.replace(/\D/g, ''); // remove non-digits
    if (value.length > 2) {
        value = value.slice(0, 2) + '-' + value.slice(2, 5);
    }
    input.value = value;
});

// Submit handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const empID = input.value.trim();

    if (empID.length === 6 && empID.includes('-')) {
        localStorage.setItem('employeeID', empID);
        message.textContent = 'ACCESS GRANTED';
        message.classList.remove('hidden', 'error');
        message.style.color = '#00ff99';

        setTimeout(() => {
            window.location.href = '../main/index.html';
        }, 800);
    } else {
        message.textContent = 'ACCESS DENIED';
        message.classList.remove('hidden');
        message.classList.add('error');
    }
});