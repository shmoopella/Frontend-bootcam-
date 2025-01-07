import React from "react";

function DeleteButton({ onDelete }) {
  return (
    <button className="btn btn-light" onClick={onDelete}>
      <img
        alt="кнопка удалить"
        src="/img/delete.png"
        className="img-fluid"
        style={{ maxWidth: "20px", maxHeight: "20px" }}
      />
    </button>
  );
}

export default React.memo(DeleteButton);
