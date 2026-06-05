import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";

function App() {
  // Keep our dark mode system detection here!
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <LandingPage />;
}

export default App;
