import React from "react";
import Routes from "./components/Home/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes />
      <Toaster />
    </div>
  );
};

export default App;
