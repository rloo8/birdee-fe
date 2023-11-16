import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import Mypage from "./Routes/Mypage";
import CreateDiary from "./Routes/CreateDiary";
import PageList from "./Routes/Page/PageList";
import CreatePage from "./Routes/Page/CreatePage";
import Page from "./Routes/Page/Page";
import Login from "./Routes/Auth/Login";
import CreateAccount from "./Routes/Auth/CreateAccount";
import HiddenDiary from "./Routes/Diary/HiddenDiary";
import DeletedDiary from "./Routes/Diary/DeletedDiary";

// 로그인한 경우에만 허용
function ProtectedRoute({ element }) {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/login" />;
}

// 로그인하지 않은 경우에만 허용
function PublicRoute({ element }) {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : element;
}

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<Home />} />}
          ></Route>
          <Route
            path="/mypage"
            element={<ProtectedRoute element={<Mypage />} />}
          ></Route>

          <Route
            path="/login"
            element={<PublicRoute element={<Login />} />}
          ></Route>
          <Route
            path="/create-account"
            element={<PublicRoute element={<CreateAccount />} />}
          ></Route>

          <Route
            path="/diaries/create"
            element={<ProtectedRoute element={<CreateDiary />} />}
          ></Route>
          <Route
            path="/diaries/hidden"
            element={<ProtectedRoute element={<HiddenDiary />} />}
          ></Route>
          <Route
            path="/diaries/deleted"
            element={<ProtectedRoute element={<DeletedDiary />} />}
          ></Route>

          <Route
            path="/diaries/:diary_id/pages"
            element={<ProtectedRoute element={<PageList />} />}
          ></Route>
          <Route
            path="/diaries/:diary_id/pages/:page_id"
            element={<ProtectedRoute element={<Page />} />}
          ></Route>
          <Route
            path="/diaries/:diary_id/pages/create"
            element={<ProtectedRoute element={<CreatePage />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
