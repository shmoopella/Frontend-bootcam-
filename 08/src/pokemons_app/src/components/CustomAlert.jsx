import React from "react";
function CustomAlert({ children, onClose }) {
  return (
    <div>
      <div className="mb-3 mt-3">
        {children}
        <button className="btn btn-dark mt-1" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default React.memo(CustomAlert);
