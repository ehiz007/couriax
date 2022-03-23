import React from "react";

export default function Error() {
  return (
    <div className="flex justify-center items-center text-2xl h-screen">
      <p className="text-stone-900 flex space-x-3">
        <span className="font-bold border-r border-black pr-3">404</span>
        <span className="pl-3"> Page not found</span>
      </p>
    </div>
  );
}
