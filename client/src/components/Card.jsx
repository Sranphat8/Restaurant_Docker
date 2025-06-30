import React from "react";

const Card = ({ id, img, title, type, onDelete }) => {
  return (
    <div className="card w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden">
      {/* รูปภาพร้านอาหาร */}
      <figure className="h-48">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </figure>

      {/* เนื้อหาภายใน card */}
      <div className="card-body px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{type}</p>

        {/* ปุ่มลบและแก้ไข */}
        <div className="flex justify-between">
          {/* ปุ่มลบ */}
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-red-600 transition focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Delete
          </button>

          {/* ปุ่มแก้ไข */}
          <button
            type="button"
            onClick={() => (window.location.href = `/update/${id}`)}
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-yellow-600 transition focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
