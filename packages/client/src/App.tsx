import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <>
      <p>{message}</p>
      <p className="font-bold p-4 text-2xl">Hello World!</p>
      <Button>Click me</Button>
    </>
  );
}

export default App;
