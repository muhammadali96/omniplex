import { Button } from "@material-tailwind/react";

export default function Greeting(props: {
  name: string | null;
  setIsLoggedIn: (value: boolean) => void;
  setIsLost: (value: boolean) => void;
}) {
  const { name, setIsLoggedIn, setIsLost } = props;
  const handleLogOut = () => {
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setIsLost(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <h2>Hi {name}!</h2>
        <Button onClick={() => handleLogOut()} color="grey">
          Log Out
        </Button>
      </div>
    </>
  );
}
