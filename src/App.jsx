import { Routes, Route } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetails from "./pages/PhotoDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PhotoList />} />
      <Route path="/photos/:id" element={<PhotoDetails />} />
    </Routes>
  );
}
