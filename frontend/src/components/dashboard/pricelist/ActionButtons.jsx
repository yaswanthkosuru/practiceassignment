import "./ActionButtons.css";

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="action-btn action-btn-new">
        <svg
          className="action-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" fill="#00c853" />
          <path
            d="M12 8V16M8 12H16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="action-label">New Product</span>
      </button>
      <button className="action-btn action-btn-print">
        <svg
          className="action-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V9"
            fill="#00bcd4"
          />
          <path
            d="M4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M4 9C2.89543 9 2 9.89543 2 11V16C2 17.1046 2.89543 18 4 18H6M6 14H18V22H6V14Z"
            fill="#00bcd4"
          />
          <rect x="6" y="14" width="12" height="8" fill="white" />
          <rect x="6" y="2" width="12" height="7" fill="white" />
        </svg>
        <span className="action-label">Print List</span>
      </button>
      <button className="action-btn action-btn-advanced">
        <svg
          className="action-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 6H21M3 12H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="6" r="2" fill="currentColor" />
          <circle cx="6" cy="12" r="2" fill="currentColor" />
          <circle cx="18" cy="18" r="2" fill="currentColor" />
        </svg>
        <span className="action-label">Advanced mode</span>
      </button>
    </div>
  );
};

export default ActionButtons;
