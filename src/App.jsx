import { useState } from "react";
import "./App.css";
import Carrinho from "./components/Carrinho";

function App() {
  const [count, setCount] = useState(0);

  return <Carrinho />;
}

export default App;
