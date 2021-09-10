import { useState } from "react";
import { Button, Input } from 'reactstrap';

let act = null;
let temp = "";
let secondNum = false;

const Calculator = () => {
  const [input, setInput] = useState("0");

  const handleInput = (num) => {
    if (secondNum) {
      secondNum = false;
      setInput("" + num);
    } else {
      setInput(input + num);
    }
  };

  const handleAction = (a) => {
    act = a;
    secondNum = true;
    temp = input;
  };

  const binaryOp = (x, y, op) => {
    let decResult;
    switch (op) {
      case "add":
        decResult = Number(parseInt(x, 2)) + Number(parseInt(y, 2));
        break;
      case "sub":
        decResult = Number(parseInt(x, 2)) - Number(parseInt(y, 2));
        break;
      case "mul":
        decResult = Number(parseInt(x, 2)) * Number(parseInt(y, 2));
        break;
      case "div":
        decResult = Number(parseInt(x, 2)) / Number(parseInt(y, 2));
        break;
      default:
        decResult = 0
    }
    return (decResult >>> 0).toString(2);
  }

  const handleEqual = () => {
    setInput(binaryOp(temp, input, act));
    act = null;
  };

  return (
    <div className="calculator">
      <Input 
        type="number"
        onKeyPress={(e) => {
          if (!/[0-1]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)} />
      <div className="buttons">
        <Button color="secondary" onClick={() => handleInput(0)}>0</Button>
        <Button color="secondary" onClick={() => handleInput(1)}>1</Button>
        <Button color="secondary" onClick={() => setInput("0")}>C</Button>
        <Button color="secondary" onClick={() => handleEqual()}>=</Button>
        <Button color="secondary" onClick={() => handleAction("add")}>+</Button>
        <Button color="secondary" onClick={() => handleAction("sub")}>-</Button>
        <Button color="secondary" onClick={() => handleAction("mul")}>*</Button>
        <Button color="secondary" onClick={() => handleAction("div")}>/</Button>
      </div>
    </div>
  );
};

export default Calculator;