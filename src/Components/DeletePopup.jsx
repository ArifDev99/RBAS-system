import React from "react";

export const DeletePopup = ({onClose , handleDelete}) => {

   
  return (
    <div>
      <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <h3 className="text-base my-4 ">Are sure you want to Delete that employee ?</h3>
          <button onClick={handleDelete}
          className="bg-red-500 px-5 py-2.5 text-white rounded-md mr-2">Delete</button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-300 text-black rounded-md"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
