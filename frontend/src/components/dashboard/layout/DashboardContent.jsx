import "./DashboardContent.css";

const DashboardContent = ({ children }) => {
  return (
    <main className="dashboard-content">
      <div className="dashboard-content-inner">
        {children}
      </div>
    </main>
  );
};

export default DashboardContent;
