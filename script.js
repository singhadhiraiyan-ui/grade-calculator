document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 📚 FÄCHER
    // ==========================================

    const subjectsContainer =
        document.getElementById("subjects");

    const addSubjectButton =
        document.getElementById("addSubjectButton");

    const overallAverage =
        document.getElementById("overallAverage");


    // ==========================================
    // 📊 FACH-DURCHSCHNITT
    // ==========================================

    function updateSubjectAverage(subject) {

        const gradeInputs =
            subject.querySelectorAll(".grade");

        let grades = [];

        gradeInputs.forEach(function (input) {

            if (input.value !== "") {

                const grade = Number(input.value);

                if (grade >= 1 && grade <= 6) {
                    grades.push(grade);
                }
            }
        });


        const averageElement =
            subject.querySelector(".subjectAverage");


        if (grades.length === 0) {

            averageElement.textContent =
                "Durchschnitt: —";

            return;
        }


        const sum =
            grades.reduce(
                function (total, grade) {
                    return total + grade;
                },
                0
            );


        const average =
            sum / grades.length;


        averageElement.textContent =
            "Durchschnitt: " +
            average.toFixed(2);
    }


    // ==========================================
    // 📊 GESAMTDURCHSCHNITT
    // ==========================================

    function updateOverallAverage() {

        const allGradeInputs =
            document.querySelectorAll(".grade");

        let allGrades = [];


        allGradeInputs.forEach(function (input) {

            if (input.value !== "") {

                const grade = Number(input.value);

                if (grade >= 1 && grade <= 6) {
                    allGrades.push(grade);
                }
            }
        });


        // Noch keine Noten vorhanden
        if (allGrades.length === 0) {

            overallAverage.textContent =
                "Gesamtdurchschnitt: —";

            return;
        }


        const total =
            allGrades.reduce(
                function (sum, grade) {
                    return sum + grade;
                },
                0
            );


        const average =
            total / allGrades.length;


        overallAverage.textContent =
            "Gesamtdurchschnitt: " +
            average.toFixed(2);
    }


    // ==========================================
    // 🧠 NOTENFELD VERBINDEN
    // ==========================================

    function connectGradeInput(input, subject) {

        input.addEventListener("input", function () {

            const grade = Number(input.value);


            // Noten überprüfen
            if (
                input.value !== "" &&
                (grade < 1 || grade > 6)
            ) {

                input.setCustomValidity(
                    "Bitte gib eine Note zwischen 1 und 6 ein."
                );

            } else {

                input.setCustomValidity("");
            }


            // Fach-Durchschnitt aktualisieren
            updateSubjectAverage(subject);


            // Gesamtdurchschnitt aktualisieren
            updateOverallAverage();
        });
    }


    // ==========================================
    // ➕ FACH HINZUFÜGEN
    // ==========================================

    addSubjectButton.addEventListener(
        "click",
        function () {

            const subjectName =
                prompt("Wie heißt das Fach?");


            if (
                subjectName === null ||
                subjectName.trim() === ""
            ) {
                return;
            }


            const subject =
                document.createElement("div");

            subject.className = "subject";


            subject.innerHTML = `
                <h3>${subjectName}</h3>

                <div class="grades">

                    <input
                        type="number"
                        class="grade"
                        min="1"
                        max="6"
                        step="0.1"
                    >

                </div>

                <button class="addGradeButton">
                    ➕ Weitere Note
                </button>

                <p class="subjectAverage">
                    Durchschnitt: —
                </p>
            `;


            subjectsContainer.appendChild(subject);


            // Erstes Notenfeld verbinden
            const firstGrade =
                subject.querySelector(".grade");

            connectGradeInput(
                firstGrade,
                subject
            );


            // ==========================================
            // ➕ WEITERE NOTE
            // ==========================================

            const addGradeButton =
                subject.querySelector(".addGradeButton");


            addGradeButton.addEventListener(
                "click",
                function () {

                    const gradesContainer =
                        subject.querySelector(".grades");


                    const newGrade =
                        document.createElement("input");


                    newGrade.type = "number";
                    newGrade.className = "grade";
                    newGrade.min = "1";
                    newGrade.max = "6";
                    newGrade.step = "0.1";


                    gradesContainer.appendChild(
                        newGrade
                    );


                    connectGradeInput(
                        newGrade,
                        subject
                    );


                    updateSubjectAverage(
                        subject
                    );

                    updateOverallAverage();
                }
            );


            updateSubjectAverage(subject);
            updateOverallAverage();
        }
    );

});
