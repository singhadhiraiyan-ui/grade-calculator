document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 📚 ELEMENTE
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
    // 💾 DATEN SPEICHERN
    // ==========================================

    function saveData() {

        const subjects =
            document.querySelectorAll(".subject");

        const data = [];

        subjects.forEach(function (subject) {

            const name =
                subject.querySelector("h3").textContent;

            const gradeInputs =
                subject.querySelectorAll(".grade");

            const grades = [];

            gradeInputs.forEach(function (input) {

                if (input.value !== "") {
                    grades.push(Number(input.value));
                }

            });

            data.push({
                name: name,
                grades: grades
            });

        });

        localStorage.setItem(
            "gradePilotData",
            JSON.stringify(data)
        );
    }


    // ==========================================
    // 📂 DATEN LADEN
    // ==========================================

    function loadData() {

        const savedData =
            localStorage.getItem("gradePilotData");

        if (!savedData) {
            return;
        }

        const data =
            JSON.parse(savedData);

        data.forEach(function (subjectData) {

            createSubject(
                subjectData.name,
                subjectData.grades
            );

        });

        updateOverallAverage();
    }


    // ==========================================
    // 📊 FACH-DURCHSCHNITT
    // ==========================================

    function updateSubjectAverage(subject) {

        const gradeInputs =
            subject.querySelectorAll(".grade");

        let grades = [];

        gradeInputs.forEach(function (input) {

            if (input.value !== "") {

                const grade =
                    Number(input.value);

                if (
                    grade >= 1 &&
                    grade <= 6
                ) {
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

                const grade =
                    Number(input.value);

                if (
                    grade >= 1 &&
                    grade <= 6
                ) {
                    allGrades.push(grade);
                }

            }

        });

        if (allGrades.length === 0) {

            overallAverage.textContent =
                "Gesamtdurchschnitt: —";

            dashboardAverage.textContent =
                "—";
updateStatistics()
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

        dashboardAverage.textContent =
            average.toFixed(2);
    }
updateStatistics()
// ==========================================
// 📊 DASHBOARD STATISTIKEN
// ==========================================

function updateStatistics() {

    const subjects =
        document.querySelectorAll(".subject");

    const subjectCount =
        document.getElementById("subjectCount");

    const gradeCount =
        document.getElementById("gradeCount");

    const bestSubject =
        document.getElementById("bestSubject");

    const worstSubject =
        document.getElementById("worstSubject");


    // Anzahl der Fächer
    subjectCount.textContent =
        subjects.length;


    // Alle Fächer untersuchen
    let totalGrades = 0;
    let best = null;
    let worst = null;


    subjects.forEach(function (subject) {

        const grades =
            subject.querySelectorAll(".grade");

        let subjectGrades = [];


        grades.forEach(function (input) {

            if (input.value !== "") {

                const grade =
                    Number(input.value);

                if (
                    grade >= 1 &&
                    grade <= 6
                ) {

                    subjectGrades.push(grade);
                    totalGrades++;
                }
            }
        });


        // Fach ohne Noten überspringen
        if (subjectGrades.length === 0) {
            return;
        }


        // Durchschnitt des Faches
        const sum =
            subjectGrades.reduce(
                function (total, grade) {
                    return total + grade;
                },
                0
            );


        const average =
            sum / subjectGrades.length;


        const name =
            subject.querySelector("h3").textContent;


        // Bestes Fach
        if (
            best === null ||
            average < best.average
        ) {

            best = {
                name: name,
                average: average
            };
        }


        // Schlechtestes Fach
        if (
            worst === null ||
            average > worst.average
        ) {

            worst = {
                name: name,
                average: average
            };
        }

    });


    // Anzahl der Noten anzeigen
    gradeCount.textContent =
        totalGrades;


    // Bestes Fach anzeigen
    if (best !== null) {

        bestSubject.textContent =
            best.name +
            " (" +
            best.average.toFixed(2) +
            ")";

    } else {

        bestSubject.textContent =
            "—";
    }


    // Fach mit der meisten Aufmerksamkeit
    if (worst !== null) {

        worstSubject.textContent =
            worst.name +
            " (" +
            worst.average.toFixed(2) +
            ")";

    } else {

        worstSubject.textContent =
            "—";
    }
}
    // ==========================================
    // 🧠 NOTENFELD VERBINDEN
    // ==========================================

    function connectGradeInput(
        input,
        subject
    ) {

        input.addEventListener(
            "input",
            function () {

                const grade =
                    Number(input.value);

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

                updateSubjectAverage(
                    subject
                );

                updateOverallAverage();

                saveData();
            }
        );
    }


    // ==========================================
    // 🏗️ FACH ERSTELLEN
    // ==========================================

    function createSubject(
        subjectName,
        savedGrades = []
    ) {

        const subject =
            document.createElement("div");

        subject.className = "subject";

        subject.innerHTML = `
            <h3>${subjectName}</h3>

            <div class="grades"></div>

            <button class="addGradeButton">
                ➕ Weitere Note
            </button>

            <button class="editSubjectButton">
                ✏️ Fach bearbeiten
            </button>

            <button class="deleteSubjectButton">
                🗑️ Fach löschen
            </button>

            <p class="subjectAverage">
                Durchschnitt: —
            </p>
        `;

        subjectsContainer.appendChild(
            subject
        );

        const gradesContainer =
            subject.querySelector(".grades");


        // ==========================================
        // 📝 NOTEN ERSTELLEN
        // ==========================================

        if (savedGrades.length === 0) {

            addGradeInput(
                subject,
                gradesContainer
            );

        } else {

            savedGrades.forEach(
                function (grade) {

                    addGradeInput(
                        subject,
                        gradesContainer,
                        grade
                    );

                }
            );

        }


        // ==========================================
        // ➕ WEITERE NOTE
        // ==========================================

        const addGradeButton =
            subject.querySelector(
                ".addGradeButton"
            );

        addGradeButton.addEventListener(
            "click",
            function () {

                addGradeInput(
                    subject,
                    gradesContainer
                );

                updateSubjectAverage(
                    subject
                );

                updateOverallAverage();

                saveData();
            }
        );


        // ==========================================
        // ✏️ FACH BEARBEITEN
        // ==========================================

        const editSubjectButton =
            subject.querySelector(
                ".editSubjectButton"
            );

        editSubjectButton.addEventListener(
            "click",
            function () {

                const currentName =
                    subject.querySelector(
                        "h3"
                    ).textContent;

                const newName =
                    prompt(
                        "Wie soll das Fach heißen?",
                        currentName
                    );


                if (
                    newName === null ||
                    newName.trim() === ""
                ) {
                    return;
                }


                subject.querySelector(
                    "h3"
                ).textContent =
                    newName.trim();


                saveData();
            }
        );


        // ==========================================
        // 🗑️ FACH LÖSCHEN
        // ==========================================

        const deleteSubjectButton =
            subject.querySelector(
                ".deleteSubjectButton"
            );

        deleteSubjectButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Möchtest du das Fach \"" +
                        subject.querySelector("h3").textContent +
                        "\" wirklich löschen?"
                    );


                if (!confirmed) {
                    return;
                }


                subject.remove();

                updateOverallAverage();

                saveData();
            }
        );


        updateSubjectAverage(
            subject
        );

        return subject;
    }


    // ==========================================
    // ➕ NOTENFELD ERSTELLEN
    // ==========================================

    function addGradeInput(
        subject,
        gradesContainer,
        value = ""
    ) {

        const newGrade =
            document.createElement("input");

        newGrade.type = "number";
        newGrade.className = "grade";
        newGrade.min = "1";
        newGrade.max = "6";
        newGrade.step = "0.1";
        newGrade.value = value;

        gradesContainer.appendChild(
            newGrade
        );

        connectGradeInput(
            newGrade,
            subject
        );
    }


    // ==========================================
    // ➕ FACH HINZUFÜGEN
    // ==========================================

    addSubjectButton.addEventListener(
        "click",
        function () {

            const subjectName =
                prompt(
                    "Wie heißt das Fach?"
                );

            if (
                subjectName === null ||
                subjectName.trim() === ""
            ) {
                return;
            }

            createSubject(
                subjectName.trim()
            );

            updateOverallAverage();

            saveData();
        }
    );


    // ==========================================
    // ⚡ AUTOMATISCHE AKTUALISIERUNG
    // ==========================================

    document.addEventListener(
        "input",
        function (event) {

            if (
                event.target.classList.contains(
                    "grade"
                )
            ) {

                updateOverallAverage();
                saveData();
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


                if (
                    currentAverage === 0 ||
                    numberOfGrades === 0 ||
                    targetAverage === 0
                ) {

                    neededGradeResult.textContent =
                        "Bitte fülle alle Felder aus.";

                    return;
                }


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


                if (
                    currentAverage <= targetAverage
                ) {

                    neededGradeResult.textContent =
                        "🎉 Dein Ziel ist bereits erreicht!";

                    return;
                }


                const neededGrade =
                    targetAverage *
                    (numberOfGrades + 1)
                    -
                    currentAverage *
                    numberOfGrades;


                if (neededGrade < 1) {

                    neededGradeResult.textContent =
                        "🎉 Dein Ziel ist mit einer sehr guten Note erreichbar!";

                    return;
                }


                if (neededGrade > 6) {

                    neededGradeResult.textContent =
                        "❌ Dieses Ziel ist mit nur einer weiteren Note nicht erreichbar.";

                    return;
                }


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

    loadData();

    updateOverallAverage();

});
