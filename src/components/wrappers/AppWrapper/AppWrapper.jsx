import React from "react";
import MyNavBar from "../../my/MyNav/MyNavBar/MyNavBar";

function AppWrapper({ children }) {
  return (
    <div id="outer-container">
      <main id="page-wrap">
        <MyNavBar />
        <div className={`myMain`}>{children}</div>
      </main>
    </div>
  );
}

export default AppWrapper;
