import React from "react";

const Sidebar = ({ isOpen, toggleSidebar, children }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {children}
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
};

export default Sidebar;
