import { Outlet } from "react-router";

export default function LegalLayout() {
  return (
    <div className="font-legal">
      <Outlet />
    </div>
  );
}