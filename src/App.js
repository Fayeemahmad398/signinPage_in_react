import SigninPage from "./Components/SigninPage";
import "./Components/style.css";
import { Route, Routes } from "react-router";
import ProfilePage from "./Components/ProfilePage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SigninPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
    </Routes>
  );
};
export default App;
