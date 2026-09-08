import { Routes, Route, Navigate } from "react-router-dom";
import ApresentationPage from "../pages/ApresentationPage";
import MeetingPage from "../pages/meetingPage";
import ConfirmacaoPage from "../pages/ConfirmacaoPage";
import { AdminLoginPage } from "../pages/Admin/AdminLoginPage";
import { AdminEventosPage } from "../pages/Admin/AdminEventosPage";
import { AdminInscricoesPage } from "../pages/Admin/AdminInscricoesPage";
import { AdminCriarEventoPage } from "../pages/Admin/AdminCriarEventoPage";
import { AdminEditarEventoPage } from "../pages/Admin/AdminEditarEventoPage";

function RotaProtegida({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ApresentationPage />} />
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/meeting/:eventId" element={<MeetingPage />} />
      <Route path="/confirmacao/:registrationId" element={<ConfirmacaoPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/eventos" element={
        <RotaProtegida>
          <AdminEventosPage />
        </RotaProtegida>
      } />
      <Route path="/admin/inscricoes/:eventId" element={
        <RotaProtegida>
          <AdminInscricoesPage />
        </RotaProtegida>
      } />
      <Route path="/admin/criarEvento/" element={
        <RotaProtegida>
          <AdminCriarEventoPage/>
        </RotaProtegida>
      } />
       <Route path="/admin/editarEvento/:eventId" element={
        <RotaProtegida>
          <AdminEditarEventoPage/>
        </RotaProtegida>
      } />
    </Routes>
  );
}