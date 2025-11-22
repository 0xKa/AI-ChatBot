import "./App.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ModeToggle } from "./components/theme/mode-toggle";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <ThemeProvider>
      <ModeToggle />
      <ChatBot />
    </ThemeProvider>
  );
}

export default App;
