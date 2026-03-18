import { useState } from "react";
import "./App.css";

function CalcButton({ label, onClick }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className={`calc-btn${pressed ? " pressed" : ""}`}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [firstNum, setFirstNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handleNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(String(num));
      setWaitingForSecond(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b !== 0 ? a / b : "Error";
      default:  return b;
    }
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);
    if (firstNum !== null && !waitingForSecond) {
      const result = calculate(firstNum, current, operator);
      setDisplay(String(result));
      setFirstNum(result);
    } else {
      setFirstNum(current);
    }
    setOperator(op);
    setWaitingForSecond(true);
  };

  const handleEquals = () => {
    if (operator === null || firstNum === null) return;
    const result = calculate(firstNum, parseFloat(display), operator);
    setDisplay(String(result));
    setFirstNum(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNum(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  return (
    <div className="wrapper">
      <div className="calculator">

        <div className="calc-title">CALCULATOR</div>

        <input className="calc-display" type="text" value={display} readOnly />

        {/* Row 1 */}
        <div className="row">
          <CalcButton label="7" onClick={() => handleNumber("7")} />
          <CalcButton label="8" onClick={() => handleNumber("8")} />
          <CalcButton label="9" onClick={() => handleNumber("9")} />
          <CalcButton label="+" onClick={() => handleOperator("+")} />
        </div>

        {/* Row 2 */}
        <div className="row">
          <CalcButton label="4" onClick={() => handleNumber("4")} />
          <CalcButton label="5" onClick={() => handleNumber("5")} />
          <CalcButton label="6" onClick={() => handleNumber("6")} />
          <CalcButton label="-" onClick={() => handleOperator("-")} />
        </div>

        {/* Row 3 */}
        <div className="row">
          <CalcButton label="1" onClick={() => handleNumber("1")} />
          <CalcButton label="2" onClick={() => handleNumber("2")} />
          <CalcButton label="3" onClick={() => handleNumber("3")} />
          <CalcButton label="*" onClick={() => handleOperator("*")} />
        </div>

        {/* Row 4 */}
        <div className="row">
          <CalcButton label="AC" onClick={handleClear} />
          <CalcButton label="0"  onClick={() => handleNumber("0")} />
          <CalcButton label="."  onClick={handleDecimal} />
          <CalcButton label="/"  onClick={() => handleOperator("/")} />
        </div>

        {/* Equals */}
        <div className="row-equals">
          <CalcButton label="=" onClick={handleEquals} />
        </div>

      </div>
    </div>
  );
}