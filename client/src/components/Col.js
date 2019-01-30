import React from "react";

export default function Col({ size, children }) {
    return (
        <div
            className="col"
        >
            {children}
        </div>
    );
}
