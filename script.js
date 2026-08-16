const gradesContainer = document.getElementById("grades");
const addGradeButton = document.getElementById("addGradeButton");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

// Weitere Note hinzufügen
addGradeButton.addEventListener("click", function() {
    const newInput = document.createElement("input");

    newInput.type = "number";
    newInput.className = "grade";
    newInput.min = "1";
    newInput.max = "6";

    gradesContainer.appendChild(newInput);
});

// Durchschnitt berechnen
calculateButton.addEventListener("click", function() {
    const gradeInputs = document.querySelectorAll(".grade");

    let grades = [];

    gradeInputs.forEach(function(input) {
        if (input.value !== "") {
            grades.push(Number(input.value));
        }
    });

    if (grades.length === 0) {
        result.textContent = "Bitte gib mindestens eine Note ein.";
        return;
    }

    const average =
        grades.reduce(function(sum, grade) {
            return sum + grade;
        }, 0) / grades.length;

    result.textContent =
        "Dein Notendurchschnitt ist: " + average.toFixed(2);
});
