import "./App.css";
import NotificationSystem from "./views/notfication-system";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <NotificationSystem />
      <Toaster />
    </>
  );
}

export default App;
