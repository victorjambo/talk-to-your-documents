import React from "react";

const Divider: React.FC<{ label?: string, classNames?: string }> = ({ label, classNames }) => {
  return (
    <div className={`relative ${classNames}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">{label}</span>
        </div>
      )}
    </div>
  );
};

export default Divider;
