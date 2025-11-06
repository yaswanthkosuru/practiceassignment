import "./SearchBar.css";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search-icon-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#00bcd4" strokeWidth="2"/>
          <path d="M13.5 13.5L17 17" stroke="#00bcd4" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
