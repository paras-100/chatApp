import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginRegisterScreen from "./screens/LoginRegisterScreen";
import ChatPageScreen from "./screens/ChatPageScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegisterScreen />} />
        <Route path="/chatPage" element={<ChatPageScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
