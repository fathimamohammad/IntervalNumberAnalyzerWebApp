import React, { useState, useEffect, useRef } from "react";
import {} from "module";
import "./App.css";
import { isFibonocci } from "./scripts/function";

function App() {
  //const seconds = "seconds";
  const [seconds, setseconds] = useState(0);
  const [counter, setcounter] = useState(0);
  const [Running, setRunning] = useState(false);
  const [numberInput, setnumberInput] = useState("");
  const [numberOutput, setnumberOutput] = useState("");
  const [enableNumberInput, setenableNumberInput] = useState(false);
  const [sortedFrequency, setsortedFrequency] = useState([]);
  const [freqArray, setfreqArray] = useState({});
  const secondsSubmit = () => {
    console.log("seconds=" + seconds);
    setRunning(true);
    if (counter === 0) {
      setcounter(seconds);
      setnumberOutput("");
      setenableNumberInput(true);
      setsortedFrequency([]);
    }
    //start1(seconds);
  };
  const resume = () => {
    if (counter > 0) {
      setRunning(true);
    }
  };
  const pause = () => {
    setRunning(false);
  };
  useInterval(
    () => {
      setcounter(counter - 1);
    },
    Running ? 1000 : null
  );

  useEffect(() => {
    if (counter === 0) {
      setRunning(false);
      setenableNumberInput(false);
      //setfinished(true);
      calculateFreq();
    }
  }, [counter]);

  const enterNumberInput = (keyCode) => {
    if (keyCode == 13) {
      let output = numberInput;
      if (!Number.isNaN(numberInput)) {
        if (isFibonocci(numberInput)) {
          output = numberInput + "(FIB)";
        }
        //freqArray[numberInput] = 1;
        let freqArrayCopy = freqArray;
        freqArrayCopy[numberInput] = freqArrayCopy[numberInput]
          ? freqArrayCopy[numberInput] + 1
          : 1;
        setfreqArray(freqArrayCopy);
        console.log(JSON.stringify(freqArray));
      }
      setnumberOutput(numberOutput + " " + output);
      setnumberInput("");
    }
  };

  const calculateFreq = () => {
    if (freqArray) {
      let sortable = [];
      for (let item in freqArray) {
        sortable.push([item, freqArray[item]]);
      }
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      setsortedFrequency(sortable);
      //console.log("sortable=" + sortable);
      // console.log("\nFrequencies:\n");
      //sortable.map((a) => console.log(a[0] + "-" + a[1] + "\n"));
      // frequency = {};
      setfreqArray({});
      setseconds(0);
    }
  };
  let renderInput = "";
  if (enableNumberInput) {
    renderInput = (
      <>
        Enter number followed by enter key:
        <input
          type="text"
          value={numberInput}
          onChange={(e) => setnumberInput(e.target.value)}
          onKeyDown={(e) => enterNumberInput(e.keyCode)}
        ></input>
      </>
    );
  } else {
    renderInput = "";
  }

  // let renderFinalOutput = {};  hh d
  // if (sortedFrequency && sortedFrequency.length > 0) {
  //   renderFinalOutput.push("Calculated Freq:");
  //   sortedFrequency.map((a) => renderFinalOutput.push(a[0] + "-" + a[1] + " "));
  // } else {
  // }

  let renderFinalOutput = "Frequency:";
  if (sortedFrequency && sortedFrequency.length > 0) {
    renderFinalOutput = sortedFrequency.map(function (item) {
      return (
        <li>
          {item[0]}-{item[1]}{" "}
        </li>
      );
    });
  } else {
    renderFinalOutput = "";
  }

  return (
    <>
      <div className="container">
        <h1 className="App">Welcome</h1>
        <div className="row">
          <div className="col-sm-6">
            <label for="seconds">Number of seconds:</label>
            <input
              type="text"
              id="seconds"
              value={seconds}
              onChange={(e) => setseconds(e.target.value)}
            ></input>
          </div>
          <div className="col-sm-6">
            <div className="counter">
              Seconds left:
              <span className="badge">{counter}</span>
            </div>
          </div>
        </div>
        <p />
        <p />
        <div className="row"></div>
        <div className="row">
          <div className="col-sm-4 middle">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => secondsSubmit()}
            >
              Submit
            </button>
          </div>
          <div className="col-sm-4 middle">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => pause()}
            >
              pause
            </button>
          </div>
          <div className="col-sm-4 middle">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => resume()}
            >
              resume
            </button>
          </div>
        </div>
        <p />
        <p />
        <div className="row">
          <div className="col-sm-12">{renderInput}</div>
        </div>
        <p />
        <p />
        <div className="row">
          <div className="col-sm-12">Entered values:{numberOutput}</div>
        </div>
        <p />
        <p />
        <div className="row">
          <div>{renderFinalOutput}</div>
        </div>
      </div>
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default App;
