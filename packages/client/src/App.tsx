import "./App.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ModeToggleButton } from "./components/theme/mode-toggle";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <ThemeProvider>
      <div className="absolute top-4 right-4">
        <ModeToggleButton />
      </div>
      <div className="p-2 pt-20 h-screen">
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
