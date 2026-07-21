import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import MeetingPage from "../pages/meetingPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/meeting/:eventId" element={<MeetingPage />} />
    </Routes>
  );
}
