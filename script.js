const gradeInput = document.getElementById("grade");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

calculateButton.addEventListener("click", function() {
    const grade = Number(gradeInput.value);

    if (grade >= 1 && grade <= 6) {
        result.textContent = "Deine Note ist: " + grade;
    } else {
        result.textContent = "Bitte gib eine Note zwischen 1 und 6 ein.";
    }
});
