import { useState } from "react";
const App = () => {
  const [input, setinput] = useState("");

  // handle click
  const handleclick = (value) => {
    setinput((prev) => prev + value);
  };

  // handle clear
  const handleclear = () => {
    setinput("");
  };

  // handle delete
  const handledelete = () => {
    setinput((prev) => prev.slice(0, -1));
  };

  // handle calculate 
  const handlecalculate = () =>{
    try{

      setinput(eval(input).toString());
    } catch(error){
      setinput("Error");
    };
  };



  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{input || "0"}</div>

        <div className="buttons">
          <button className="btn control"onClick={handleclear}>C</button>
          <button className="btn control" onClick={handledelete}>Del</button>
          <button className="btn operator" onClick={()=> handleclick("%")}>%</button>
          <button className="btn operator" onClick={()=> handleclick("/")}>/</button>

          <button className="btn"onClick={()=> handleclick("7")}>7</button>
          <button className="btn"onClick={()=> handleclick("8")}>8</button>
          <button className="btn"onClick={()=> handleclick("9")}>9</button>
          <button className="btn operator" onClick={()=> handleclick("*")}>x</button>

          <button className="btn" onClick={()=> handleclick("4")}>4</button>
          <button className="btn" onClick={()=> handleclick("5")}>5</button>
          <button className="btn" onClick={()=> handleclick("6")}>6</button>
          <button className="btn operator" onClick={()=> handleclick("-")}>-</button>

          <button className="btn" onClick={()=> handleclick("1")}>1</button>
          <button className="btn" onClick={()=> handleclick("2")}>2</button>
          <button className="btn" onClick={()=> handleclick("3")}>3</button>
          <button className="btn operator" onClick={()=> handleclick("+")}>+</button>

          <button className="btn zero" onClick={()=> handleclick("0")}>0</button>
          <button className="btn" onClick={()=> handleclick(".")}>.</button>
          <button className="btn equals" onClick={handlecalculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
