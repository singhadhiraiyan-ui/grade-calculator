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

                    const grade =
                        Number(input.value);

                    if (grade >= 1 && grade <= 6) {
                        grades.push(grade);
                    }
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

        const grades = [];

        gradeInputs.forEach(function (input) {

            if (input.value !== "") {

                const grade =
                    Number(input.value);

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

        const total =
            grades.reduce(function (sum, grade) {
                return sum + grade;
            }, 0);

        const average =
            total / grades.length;

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

        const allGrades = [];

        allGradeInputs.forEach(function (input) {

            if (input.value !== "") {

                const grade =
                    Number(input.value);

                if (grade >= 1 && grade <= 6) {
                    allGrades.push(grade);
                }
            }
        });

        if (allGrades.length === 0) {

            if (overallAverage) {
                overallAverage.textContent =
                    "Gesamtdurchschnitt: —";
            }

            if (dashboardAverage) {
                dashboardAverage.textContent = "—";
            }

            return;
        }

        const total =
            allGrades.reduce(function (sum, grade) {
                return sum + grade;
            }, 0);

        const average =
            total / allGrades.length;

        if (overallAverage) {

            overallAverage.textContent =
                "Gesamtdurchschnitt: " +
                average.toFixed(2);
        }

        if (dashboardAverage) {
            dashboardAverage.textContent =
                average.toFixed(2);
        }
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

                updateSubjectAverage(subject);
                updateOverallAverage();
                updateStatistics();
                saveData();
            }
        );
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

        gradesContainer.appendChild(newGrade);

        connectGradeInput(
            newGrade,
            subject
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

        subjectsContainer.appendChild(subject);


        const gradesContainer =
            subject.querySelector(".grades");


        // Noten laden

        if (savedGrades.length === 0) {

            addGradeInput(
                subject,
                gradesContainer
            );

        } else {

            savedGrades.forEach(function (grade) {

                addGradeInput(
                    subject,
                    gradesContainer,
                    grade
                );
            });
        }


        // ==========================================
        // ➕ WEITERE NOTE
        // ==========================================

        const addGradeButton =
            subject.querySelector(".addGradeButton");

        addGradeButton.addEventListener(
            "click",
            function () {

                addGradeInput(
                    subject,
                    gradesContainer
                );

                updateSubjectAverage(subject);
                updateOverallAverage();
                updateStatistics();
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
                    subject.querySelector("h3").textContent;

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

                subject.querySelector("h3").textContent =
                    newName.trim();

                saveData();
                updateExamSubjects();
                updateStatistics();
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
                updateExamSubjects();
                updateStatistics();
                saveData();
            }
        );


        updateSubjectAverage(subject);

        return subject;
    }


    // ==========================================
    // ➕ FACH HINZUFÜGEN
    // ==========================================

    if (addSubjectButton) {

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

                createSubject(
                    subjectName.trim()
                );

                updateOverallAverage();
                updateExamSubjects();
                updateStatistics();
                saveData();
            }
        );
    }


    // ==========================================
    // 📈 DASHBOARD STATISTIKEN
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

        if (subjectCount) {
            subjectCount.textContent =
                subjects.length;
        }


        let totalGrades = 0;

        let best = null;
        let worst = null;


        subjects.forEach(function (subject) {

            const name =
                subject.querySelector("h3").textContent;

            const gradeInputs =
                subject.querySelectorAll(".grade");

            const grades = [];


            gradeInputs.forEach(function (input) {

                if (input.value !== "") {

                    const grade =
                        Number(input.value);

                    if (grade >= 1 && grade <= 6) {

                        grades.push(grade);
                        totalGrades++;
                    }
                }
            });


            if (grades.length === 0) {
                return;
            }


            const average =
                grades.reduce(
                    function (sum, grade) {
                        return sum + grade;
                    },
                    0
                ) / grades.length;


            const subjectData = {
                name: name,
                average: average
            };


            if (
                best === null ||
                average < best.average
            ) {
                best = subjectData;
            }


            if (
                worst === null ||
                average > worst.average
            ) {
                worst = subjectData;
            }
        });


        // Anzahl Noten

        if (gradeCount) {

            gradeCount.textContent =
                totalGrades;
        }


        // Bestes Fach

        if (bestSubject) {

            if (best === null) {

                bestSubject.textContent =
                    "—";

            } else {

                bestSubject.textContent =
                    best.name +
                    " (" +
                    best.average.toFixed(2) +
                    ")";
            }
        }


        // Schlechtestes Fach

        if (worstSubject) {

            if (worst === null) {

                worstSubject.textContent =
                    "—";

            } else {

                worstSubject.textContent =
                    worst.name +
                    " (" +
                    worst.average.toFixed(2) +
                    ")";
            }
        }
    }


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
                    !currentAverage ||
                    !numberOfGrades ||
                    !targetAverage
                ) {

                    neededGradeResult.textContent =
                        "Bitte fülle alle Felder aus.";

                    return;
                }


                if (
                    currentAverage < 1 ||
                    currentAverage > 6 ||
                    targetAverage < 1 ||
                    targetAverage > 6 ||
                    numberOfGrades < 1
                ) {

                    neededGradeResult.textContent =
                        "Bitte überprüfe deine Eingaben.";

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
    // 📅 PRÜFUNGSPLANER
    // ==========================================

    const examSubject =
        document.getElementById("examSubject");

    const examName =
        document.getElementById("examName");

    const examDate =
        document.getElementById("examDate");

    const addExamButton =
        document.getElementById("addExamButton");

    const examList =
        document.getElementById("examList");


    // ==========================================
    // 📚 FÄCHER IN DROPDOWN LADEN
    // ==========================================

    function updateExamSubjects() {

        if (!examSubject) {
            return;
        }

        const subjects =
            document.querySelectorAll(".subject");


        examSubject.innerHTML =
            '<option value="">Fach auswählen</option>';


        subjects.forEach(function (subject) {

            const heading =
                subject.querySelector("h3");

            if (!heading) {
                return;
            }

            const subjectName =
                heading.textContent;


            const option =
                document.createElement("option");

            option.value = subjectName;
            option.textContent = subjectName;


            examSubject.appendChild(option);
        });
    }


    // ==========================================
    // 💾 PRÜFUNGEN SPEICHERN
    // ==========================================

    function saveExams(exams) {

        localStorage.setItem(
            "gradePilotExams",
            JSON.stringify(exams)
        );
    }


    // ==========================================
    // 📂 PRÜFUNGEN LADEN
    // ==========================================

    function loadExams() {

        const savedExams =
            localStorage.getItem(
                "gradePilotExams"
            );


        if (!savedExams) {
            return [];
        }


        try {

            return JSON.parse(savedExams);

        } catch (error) {

            console.error(
                "Fehler beim Laden der Prüfungen:",
                error
            );

            return [];
        }
    }


    // ==========================================
    // 📋 PRÜFUNGEN ANZEIGEN
    // ==========================================

    function displayExams() {

        if (!examList) {
            return;
        }


        const exams =
            loadExams();


        examList.innerHTML = "";


        if (exams.length === 0) {

            examList.innerHTML =
                '<p id="noExams">Noch keine Prüfungen geplant.</p>';

            return;
        }


        // Nach Datum sortieren

        exams.sort(function (a, b) {

            return a.date.localeCompare(b.date);
        });


        exams.forEach(function (exam, index) {

            const examCard =
                document.createElement("div");

            examCard.className =
                "examCard";


            examCard.innerHTML = `
                <h4>${exam.name}</h4>

                <p>📚 ${exam.subject}</p>

                <p>📅 ${exam.date}</p>

                <button class="deleteExamButton">
                    🗑️ Prüfung löschen
                </button>
            `;


            const deleteButton =
                examCard.querySelector(
                    ".deleteExamButton"
                );


            deleteButton.addEventListener(
                "click",
                function () {

                    const confirmed =
                        confirm(
                            "Möchtest du diese Prüfung wirklich löschen?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    const currentExams =
                        loadExams();


                    const examIndex =
                        currentExams.findIndex(
                            function (item) {

                                return (
                                    item.subject === exam.subject &&
                                    item.name === exam.name &&
                                    item.date === exam.date
                                );
                            }
                        );


                    if (examIndex !== -1) {

                        currentExams.splice(
                            examIndex,
                            1
                        );
                    }


                    saveExams(currentExams);

                    displayExams();
                }
            );


            examList.appendChild(examCard);
        });
    }


    // ==========================================
    // ➕ PRÜFUNG HINZUFÜGEN
    // ==========================================

    if (addExamButton) {

        addExamButton.addEventListener(
            "click",
            function () {

                const subject =
                    examSubject.value.trim();

                const name =
                    examName.value.trim();

                const date =
                    examDate.value;


                if (
                    subject === "" ||
                    name === "" ||
                    date === ""
                ) {

                    alert(
                        "Bitte fülle alle Felder aus."
                    );

                    return;
                }


                const exams =
                    loadExams();


                exams.push({

                    subject: subject,

                    name: name,

                    date: date

                });


                saveExams(exams);


                examSubject.value = "";
                examName.value = "";
                examDate.value = "";


                displayExams();
            }
        );
    }


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
                updateStatistics();
                saveData();
            }
        }
    );


    // ==========================================
    // 🚀 GRADEPILOT STARTEN
    // ==========================================

    loadData();

    updateOverallAverage();

    updateStatistics();

    updateExamSubjects();

    displayExams();

});
