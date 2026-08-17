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
    newInput.step = "1";

    gradesContainer.appendChild(newInput);
});

// Durchschnitt berechnen
calculateButton.addEventListener("click", function() {
    const gradeInputs = document.querySelectorAll(".grade");

    let grades = [];

    for (let input of gradeInputs) {
        if (input.value !== "") {
            const grade = Number(input.value);

            // Prüfen, ob die Note zwischen 1 und 6 liegt
            if (grade < 1 || grade > 6) {
                result.textContent = "Bitte gib nur Noten von 1 bis 6 ein.";
                return;
            }

            grades.push(grade);
        }
    }

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
