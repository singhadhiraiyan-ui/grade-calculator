// ===============================
// GradePilot - Subject System
// ===============================


// ➕ Weitere Note zu einem Fach hinzufügen
const addGradeButtons = document.querySelectorAll(".addGradeButton");

addGradeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const subject = button.closest(".subject");
        const gradesContainer = subject.querySelector(".grades");

        const newInput = document.createElement("input");

        newInput.type = "number";
        newInput.className = "grade";
        newInput.min = "1";
        newInput.max = "6";
        newInput.step = "1";

        gradesContainer.appendChild(newInput);
    });

});


// 📊 Durchschnitt eines einzelnen Faches berechnen
function calculateSubjectAverage(subject) {

    const gradeInputs = subject.querySelectorAll(".grade");

    let grades = [];

    gradeInputs.forEach(function(input) {

        if (input.value !== "") {

            const grade = Number(input.value);

            if (grade < 1 || grade > 6) {
                return;
            }

            grades.push(grade);
        }

    });


    if (grades.length === 0) {
        return null;
    }


    const sum = grades.reduce(function(total, grade) {
        return total + grade;
    }, 0);


    return sum / grades.length;
}


// 🔄 Durchschnitt jedes Faches aktualisieren
function updateSubjectAverages() {

    const subjects = document.querySelectorAll(".subject");

    subjects.forEach(function(subject) {

        const averageElement =
            subject.querySelector(".subjectAverage");

        const average = calculateSubjectAverage(subject);


        if (average === null) {

            averageElement.textContent =
                "Durchschnitt: —";

        } else {

            averageElement.textContent =
                "Durchschnitt: " + average.toFixed(2);
        }

    });

}


// 📊 Gesamtdurchschnitt berechnen
const calculateOverallButton =
    document.getElementById("calculateOverallButton");

const overallResult =
    document.getElementById("overallResult");


calculateOverallButton.addEventListener("click", function() {

    const subjects = document.querySelectorAll(".subject");

    let allGrades = [];


    subjects.forEach(function(subject) {

        const gradeInputs =
            subject.querySelectorAll(".grade");


        gradeInputs.forEach(function(input) {

            if (input.value !== "") {

                const grade = Number(input.value);


                if (grade < 1 || grade > 6) {

                    overallResult.textContent =
                        "Bitte gib nur Noten von 1 bis 6 ein.";

                    return;
                }


                allGrades.push(grade);
            }

        });

    });


    if (allGrades.length === 0) {

        overallResult.textContent =
            "Bitte gib mindestens eine Note ein.";

        return;
    }


    const total =
        allGrades.reduce(function(sum, grade) {
            return sum + grade;
        }, 0);


    const overallAverage =
        total / allGrades.length;


    overallResult.textContent =
        "Gesamtdurchschnitt: " +
        overallAverage.toFixed(2);

});


// ➕ Neues Fach hinzufügen
const addSubjectButton =
    document.getElementById("addSubjectButton");


const subjectsContainer =
    document.getElementById("subjects");


addSubjectButton.addEventListener("click", function() {

    const subjectName =
        prompt("Wie heißt das neue Fach?");


    if (subjectName === null || subjectName.trim() === "") {
        return;
    }


    const subject = document.createElement("div");

    subject.className = "subject";


    subject.innerHTML = `
        <h3>${subjectName}</h3>

        <div class="grades">
            <input
                type="number"
                class="grade"
                min="1"
                max="6"
                step="1"
            >
        </div>

        <button class="addGradeButton">
            Weitere Note
        </button>

        <p class="subjectAverage">
            Durchschnitt: —
        </p>
    `;


    subjectsContainer.appendChild(subject);


    // Button des neuen Faches aktivieren
    const newAddGradeButton =
        subject.querySelector(".addGradeButton");


    newAddGradeButton.addEventListener("click", function() {

        const gradesContainer =
            subject.querySelector(".grades");


        const newInput =
            document.createElement("input");


        newInput.type = "number";
        newInput.className = "grade";
        newInput.min = "1";
        newInput.max = "6";
        newInput.step = "1";


        gradesContainer.appendChild(newInput);

    });

});
