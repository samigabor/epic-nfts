import "./Header.css";

function Header({ tabs, activeTabs, setActiveTabs }) {
  return (
    <header>
      {Object.values(tabs).map((tab) => (
        <button
          className={`tab-button ${activeTabs === tab ? "active" : ""}`}
          onClick={() => setActiveTabs(tab)}
          key={tab}
        >
          {tab}
        </button>
      ))}
    </header>
  );
}

export default Header;
