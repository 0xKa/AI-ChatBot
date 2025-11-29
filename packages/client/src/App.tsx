import "./App.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ModeToggleButton } from "./components/theme/mode-toggle";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <ThemeProvider>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggleButton />
      </div>
      <div className="mt-20">
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
