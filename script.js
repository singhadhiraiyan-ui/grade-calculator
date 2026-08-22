document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 📚 NOTENDURCHSCHNITT
    // ==========================================

    const gradesContainer = document.getElementById("grades");
    const addGradeButton = document.getElementById("addGradeButton");
    const calculateButton = document.getElementById("calculateButton");
    const result = document.getElementById("result");


    // Weitere Note hinzufügen
    if (addGradeButton) {
        addGradeButton.addEventListener("click", function () {

            const newInput = document.createElement("input");

            newInput.type = "number";
            newInput.className = "grade";
            newInput.min = "1";
            newInput.max = "6";
            newInput.step = "0.1";

            gradesContainer.appendChild(newInput);
        });
    }


    // Durchschnitt berechnen
    if (calculateButton) {
        calculateButton.addEventListener("click", function () {

            const gradeInputs = document.querySelectorAll(".grade");

            let grades = [];

            gradeInputs.forEach(function (input) {

                if (input.value !== "") {

                    const grade = Number(input.value);

                    if (grade >= 1 && grade <= 6) {
                        grades.push(grade);
                    }
                }
            });


            if (grades.length === 0) {

                result.textContent =
                    "Bitte gib mindestens eine Note von 1 bis 6 ein.";

                return;
            }


            const average =
                grades.reduce(function (sum, grade) {
                    return sum + grade;
                }, 0) / grades.length;


            result.textContent =
                "Dein Notendurchschnitt ist: " +
                average.toFixed(2);
        });
    }


    // ==========================================
    // 🎯 WELCHE NOTE BRAUCHE ICH?
    // ==========================================

    const calculateNeededGrade =
        document.getElementById("calculateNeededGrade");

    const neededGradeResult =
        document.getElementById("neededGradeResult");


    if (calculateNeededGrade) {

        calculateNeededGrade.addEventListener("click", function () {

            const currentAverage =
                Number(document.getElementById("currentAverage").value);

            const numberOfGrades =
                Number(document.getElementById("numberOfGrades").value);

            const targetAverage =
                Number(document.getElementById("targetAverage").value);


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


            // Prüfen, ob die Noten zwischen 1 und 6 liegen
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


            // Prüfen, ob das Ziel bereits erreicht wurde
            if (currentAverage <= targetAverage) {

                neededGradeResult.textContent =
                    "🎉 Dein Ziel ist bereits erreicht!";

                return;
            }


            // Benötigte nächste Note berechnen
            const neededGrade =
                targetAverage * (numberOfGrades + 1)
                - currentAverage * numberOfGrades;


            // Besser als 1 geht nicht
            if (neededGrade < 1) {

                neededGradeResult.textContent =
                    "🎉 Dein Ziel ist mit einer sehr guten Note erreichbar!";

                return;
            }


            // Schlechter als 6 geht nicht
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
        });
    }

});
