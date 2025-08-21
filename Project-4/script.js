function addToDisplay(v) {
    document.getElementById("display").value += v;
}

function calculate() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch (error) {
        document.getElementById("display").value = "error";
    }
}

function clearDisplay() {
    document.getElementById("display").value = " ";
}