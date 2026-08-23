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

    const dashboardAverage =
        document.getElementById("dashboardAverage");


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


        // Keine Noten vorhanden
        if (allGrades.length === 0) {

            overallAverage.textContent =
                "Gesamtdurchschnitt: —";

            dashboardAverage.textContent =
                "—";

            return;
        }


        // Alle Noten zusammenrechnen
        const total =
            allGrades.reduce(
                function (sum, grade) {
                    return sum + grade;
                },
                0
            );


        // Durchschnitt berechnen
        const average =
            total / allGrades.length;


        // Normalen Gesamtdurchschnitt aktualisieren
        overallAverage.textContent =
            "Gesamtdurchschnitt: " +
            average.toFixed(2);


        // Dashboard-Durchschnitt aktualisieren
        dashboardAverage.textContent =
            average.toFixed(2);
    }


    // ==========================================
    // 🧠 NOTENFELD VERBINDEN
    // ==========================================

    function connectGradeInput(input, subject) {

        input.addEventListener(
            "input",
            function () {

                const grade =
                    Number(input.value);


                // Note überprüfen
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
            }
        );
    }


    // ==========================================
    // ➕ FACH HINZUFÜGEN
    // ==========================================

    addSubjectButton.addEventListener(
        "click",
        function () {

            const subjectName =
                prompt("Wie heißt das Fach?");


            // Abbrechen oder leer lassen
            if (
                subjectName === null ||
                subjectName.trim() === ""
            ) {
                return;
            }


            // Neues Fach erstellen
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


            // ==========================================
            // 📝 ERSTE NOTE VERBINDEN
            // ==========================================

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


                    // Neues Notenfeld verbinden
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


            // Durchschnitt aktualisieren
            updateSubjectAverage(subject);

            updateOverallAverage();
        }
    );


    // ==========================================
    // ⚡ AUTOMATISCHE AKTUALISIERUNG
    // ==========================================

    document.addEventListener(
        "input",
        function (event) {

            if (
                event.target.classList.contains("grade")
            ) {

                updateOverallAverage();
            }
        }
    );


    // ==========================================
    // 🎯 WELCHE NOTE BRAUCHE ICH?
    // ==========================================

    const calculateNeededGrade =
        document.getElementById(
            "calculateNeededGrade"
        );

    const neededGradeResult =
        document.getElementById(
            "neededGradeResult"
        );


    if (calculateNeededGrade) {

        calculateNeededGrade.addEventListener(
            "click",
            function () {

                const currentAverage =
                    Number(
                        document.getElementById(
                            "currentAverage"
                        ).value
                    );


                const numberOfGrades =
                    Number(
                        document.getElementById(
                            "numberOfGrades"
                        ).value
                    );


                const targetAverage =
                    Number(
                        document.getElementById(
                            "targetAverage"
                        ).value
                    );


                // Eingaben überprüfen
                if (
                    currentAverage === 0 ||
                    numberOfGrades === 0 ||
                    targetAverage === 0
                ) {

                    neededGradeResult.textContent =
                        "Bitte fülle alle Felder aus.";

                    return;
                }


                // Notenbereich überprüfen
                if (
                    currentAverage < 1 ||
                    currentAverage > 6 ||
                    targetAverage < 1 ||
                    targetAverage > 6
                ) {

                    neededGradeResult.textContent =
                        "Noten müssen zwischen 1 und 6 liegen.";

                    return;
                }


                // Ziel bereits erreicht
                if (
                    currentAverage <= targetAverage
                ) {

                    neededGradeResult.textContent =
                        "🎉 Dein Ziel ist bereits erreicht!";

                    return;
                }


                // Benötigte Note berechnen
                const neededGrade =
                    targetAverage *
                    (numberOfGrades + 1)
                    -
                    currentAverage *
                    numberOfGrades;


                // Note besser als 1
                if (neededGrade < 1) {

                    neededGradeResult.textContent =
                        "🎉 Dein Ziel ist mit einer sehr guten Note erreichbar!";

                    return;
                }


                // Note schlechter als 6
                if (neededGrade > 6) {

                    neededGradeResult.textContent =
                        "❌ Dieses Ziel ist mit nur einer weiteren Note nicht erreichbar.";

                    return;
                }


                // Ergebnis anzeigen
                neededGradeResult.textContent =
                    "🎯 Du brauchst ungefähr eine " +
                    neededGrade.toFixed(2) +
                    " in der nächsten Note.";
            }
        );
    }


    // ==========================================
    // 🚀 START
    // ==========================================

    updateOverallAverage();

});
