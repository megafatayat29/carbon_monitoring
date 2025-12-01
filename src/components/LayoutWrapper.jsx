import React from "react";

export default function LayoutWrapper({ children }) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
