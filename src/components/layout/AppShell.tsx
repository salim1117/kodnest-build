import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppShell = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-1 px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
