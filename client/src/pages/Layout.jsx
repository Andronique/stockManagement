import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
          <Sidebar />
          <main className="main">
          <Navbar />
            <div>
              {children}
            </div>
          </main>
    </React.Fragment>
  );
};

export default Layout;