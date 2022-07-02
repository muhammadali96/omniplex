import { Button } from "@material-tailwind/react";

export default function AreYouLost(props: {
  name: string | null;
  setIsLost: (value: boolean) => void;
}) {
  const { name, setIsLost } = props;
  return (
    <>
      <div className="bg-white shadow-md rounded px-2 pt-2 pb-2 flex space-x-40">
        <h1>Are you lost {name}?</h1>
        <Button
          onClick={() =>
            chrome.tabs.update({ url: "https://help.nickelled.com" })
          }
          size="sm"
          color="green"
        >
          Yes
        </Button>
        <Button onClick={() => setIsLost(false)} size="sm" color="red">
          No
        </Button>
      </div>
    </>
  );
}
