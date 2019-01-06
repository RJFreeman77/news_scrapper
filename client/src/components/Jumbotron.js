import React from "react";

function Jumbotron({ children }) {
    return (
        <div className="jumbotron bg-success">
            {children}
        </div>
    );
}

export default Jumbotron;