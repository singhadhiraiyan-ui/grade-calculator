document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 📚 FÄCHER
    // ==========================================

    const subjectsContainer =
        document.getElementById("subjects");

    const addSubjectButton =
        document.getElementById("addSubjectButton");


    // Fach hinzufügen
    addSubjectButton.addEventListener("click", function () {

        const subjectName =
            prompt("Wie heißt das Fach?");


        // Wenn nichts eingegeben wurde
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


                updateSubjectAverage(subject);
            }
        );


        // Durchschnitt anzeigen
        updateSubjectAverage(subject);

    });


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
            subject.querySelector(
                ".subjectAverage"
            );


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

});
