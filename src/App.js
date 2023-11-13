import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Mypage from "./Routes/Mypage";
import CreateDiary from "./Routes/CreateDiary";
import PageList from "./Routes/PageList";
import CreatePage from "./Routes/CreatePage";
import Page from "./Routes/Page";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/diaries/create" element={<CreateDiary />}></Route>
          <Route path="/diaries/:id/pages" element={<PageList />}></Route>
          <Route path="/diaries/:id/page/:page_id" element={<Page />}></Route>
          <Route
            path="/diaries/:id/pages/create"
            element={<CreatePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
