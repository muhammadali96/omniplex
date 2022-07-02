import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import IdleTimer from "react-idle-timer";

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
        />
      ) : (
        <SignInForm setIsLoggedIn={setIsLoggedIn} />
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

function SignInForm(props: any) {
  const [currentName, setCurrentName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleInputSubmit = () => {
    if (currentPassword === "password" && currentName.length) {
      localStorage.setItem("name", currentName);
      props.setIsLoggedIn(true);
    }
  };

  return (
    <>
      <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <Input
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex flex-col space-y-4 items-center justify-between">
          <Button onClick={() => handleInputSubmit()}>Sign In</Button>
          <Button>filled</Button>
        </div>
      </div>
    </>
  );
}

function Greeting(props: any) {
  const { name, setIsLoggedIn } = props;
  const handleLogOut = () => {
    localStorage.removeItem("name");
    setIsLoggedIn(false);
  };
  return (
    <>
      <div>
        <h1>Hi {name}</h1>
        <div className="flex items-center justify-between">
          <Button onClick={() => handleLogOut()}>Log Out</Button>
        </div>
      </div>
    </>
  );
}

function AreYouLost(props: any) {
  const { name, setIsLost } = props;
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1>Are you lost {name}</h1>
        <Button
          onClick={() =>
            chrome.tabs.update({ url: "https://help.nickelled.com" })
          }
        >
          Yes
        </Button>
        <Button onClick={() => setIsLost(false)}>No</Button>
      </div>
    </>
  );
}

export default App;
