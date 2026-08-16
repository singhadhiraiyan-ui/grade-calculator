const gradeInput = document.getElementById("grade");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");
calculateButton.addEventListener("click", function() {
    result.textContent = "You clicked the button!";
});
