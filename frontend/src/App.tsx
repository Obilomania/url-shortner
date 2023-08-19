import React from "react";
import FooterSection from "./component/FooterSection";
import Landing from "./component/Landing";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="w-full py-10">
        <h1 className="text-center  text-primary text-4xl uppercase font-semibold ">
          SpLink URL Shortner
        </h1>
        <Landing />
        <FooterSection />
      </div>
    </BrowserRouter>
  );
}

export default App;
