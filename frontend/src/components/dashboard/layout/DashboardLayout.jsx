import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <TopNavbar />
      <div className="dashboard-main">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </div>
  );
};

export default DashboardLayout;
