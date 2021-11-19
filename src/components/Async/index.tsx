import { useEffect, useState } from "react";

export function Async () {
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setButtonVisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
     {buttonVisible && <button>button</button>}
    </div>
  );
}