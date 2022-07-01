import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("name"));
  const [isLost, setIsLost] = useState(false);
  return (
    <div className="App">
      {
        //if no name in local storage then show SignInForm
        //if name exists show hi {name} with a logout button
        //implement dwell time function that renders new component after 5 seconds
        //new component shows are you lost? with redirect links
      }
      {isLoggedIn ? (
        <Greeting
          name={localStorage.getItem("name")}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <SignInForm setIsLoggedIn={setIsLoggedIn} />
      )}
      {
        //wait 5 seconds then setIsLost to true
      }
      {isLost && (
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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
        <div className="flex items-center justify-between">
          <Button onClick={() => handleInputSubmit()}>Sign In</Button>
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
          onClick={() => (window.location.href = "https://help.nickelled.com")}
        >
          Yes
        </Button>
        <Button onClick={() => setIsLost(false)}>No</Button>
      </div>
    </>
  );
}

export default App;
