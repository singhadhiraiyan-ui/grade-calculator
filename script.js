const gradeInput = document.getElementById("grade");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

calculateButton.addEventListener("click", function() {
    const grade = gradeInput.value;
    result.textContent = "Deine Note ist: " + grade;
});
