import { useState } from "react";

const Content = () => {
  const [name, setName] = useState("");

  const handleName = () => {
    const name = ["lemesa", "ali", "abdi"];
    let index = Math.floor(Math.random() * 3);
    setName(name[index]);
  };
  return (
    <div onClick={handleName} className="min-h-[440px] max-h-svh">
      {name}{" "}
    </div>
  );
};

export default Content;
