import { useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter } from "react-router-dom";
import Approute from "./Approute";


function App() {
  useEffect(() => {
    document.body.setAttribute("data-spy", "scroll");
    document.body.setAttribute("data-target", ".navbar");
    document.body.setAttribute("data-offset", "51");

    // Bootstrap 4 ScrollSpy refresh
    if (window.$) {
      window.$(window).scrollspy({ target: ".navbar", offset: 51 });
    }

    return () => {
      document.body.removeAttribute("data-spy");
      document.body.removeAttribute("data-target");
      document.body.removeAttribute("data-offset");
    };
  }, []);

  return (
    <div id="app">
      <BrowserRouter>
      
        <Approute/>
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
