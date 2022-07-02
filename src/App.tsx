import React, { useEffect, useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import Greeting from "./components/Greeting";
import SignInForm from "./components/SignInForm";
import AreYouLost from "./components/AreYouLost";

function App() {
  const idleTimerRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("name"));
  const [isLost, setIsLost] = useState(false);
  const onIdle = () => {
    setIsLost(true);
  };

  useEffect(() => {
    console.log("user is active");
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Greeting
          name={localStorage.getItem("name")}
          setIsLoggedIn={setIsLoggedIn}
          setIsLost={setIsLost}
        />
      ) : (
        <SignInForm setIsLoggedIn={setIsLoggedIn} setIsLost={setIsLost} />
      )}
      <IdleTimer
        //@ts-ignore
        ref={idleTimerRef}
        timeout={5 * 1000}
        onIdle={onIdle}
      ></IdleTimer>
      {isLost && isLoggedIn && (
        <AreYouLost name={localStorage.getItem("name")} setIsLost={setIsLost} />
      )}
    </div>
  );
}

export default App;
