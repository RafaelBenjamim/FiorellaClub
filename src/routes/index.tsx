import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import MeetingPage from "../pages/meetingPage";
import ConfirmacaoPage from "../pages/ConfirmacaoPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/meeting/:eventId" element={<MeetingPage />} />
      <Route
        path="/confirmacao/:registrationId"
        element={<ConfirmacaoPage />}
      />
    </Routes>
  );
}
