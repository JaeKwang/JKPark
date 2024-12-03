function calculate() {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);

  let option = document.getElementById("operation").value;
  let result = "";

  if (isNaN(num1) || isNaN(num2)) result = "Input Error!!";
  else {
    switch (option) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 == 0) result = "Error Divided By 0";
        else result = num1 % num2;
        break;
      default:
        result = "Invalid operation!";
        break;
    }
  }

  document.getElementById("result").textContent = "Result: " + result;
}
