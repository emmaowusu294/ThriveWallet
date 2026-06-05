import { useEffect } from "react";

function App() {
  // This useEffect checks the user's system preference on load
  // and adds the 'dark' class to the HTML tag if they prefer dark mode.
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    // Look at how we define both light and dark mode styles on the wrapper
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          ThriveWallet
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
          System theme detection is active. 🚀
        </p>
        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
