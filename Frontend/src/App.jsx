import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
export default function App() {
  return (
   <Routes>
    <Route path="/" Component={AuthPage} />
    <Route path="/home" Component={HomePage} />
   </Routes>
  )
}