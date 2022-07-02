import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

export default function SignInForm(props: {
  setIsLoggedIn: (value: boolean) => void;
  setIsLost: (value: boolean) => void;
}) {
  const { setIsLoggedIn, setIsLost } = props;
  const [currentName, setCurrentName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleInputSubmit = () => {
    if (currentPassword === "password" && currentName.length) {
      localStorage.setItem("name", currentName);
      setIsLoggedIn(true);
      setIsLost(false);
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
          <Button onClick={() => handleInputSubmit()} color="grey">
            Sign In
          </Button>
          <Button>Sign In with FaceBook</Button>
          <Button color="light-blue">Sign In with Twitter</Button>
        </div>
      </div>
    </>
  );
}
