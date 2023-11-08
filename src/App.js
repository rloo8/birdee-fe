import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Mypage from "./Routes/Mypage";
import CreateDiary from "./Routes/CreateDiary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/create-diary" element={<CreateDiary />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
