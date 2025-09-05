import { FaTrash } from "react-icons/fa";
// import Board from "../../components/Buttons/demo";
import Modal from "../../components/Buttons/demo";
import { useState } from "react";
import Dropdown from "../../components/dropdown";

export const Contact = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <Board value={3}/> */}
      <button
        className="bg-red-300 rounded-lg flex items-center gap-2 p-2 hover:bg-red-700"
        onClick={() => setOpen(true)}
      >
        <FaTrash />
        Delete
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="bg-white grid grid-cols-2 grid-rows-2 gap-2">
          {/* Image */}
          <div className="row-span-3">
            <div className="rounded-lg border-dashed border-gray-200 border-2 py-16 px-2 flex justify-center">
              <div className=""> Upload image</div>
            </div>
          </div>
          {/* Product's information */}
          <div>
            <div className="border-b-2">Create Product</div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Product name"
                  required
                  className="peer bg-transparent outline-none border-b-2 border-b-gray-200 focus:border-b-blue-600"
                />
                {/* Category */}
                <Dropdown
                  button_context={"Dropdown button"}
                  content={items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white cursor-pointer hover:bg-blue-100 p-2"
                    >{`Item ${i + 1}`}</div>
                  ))}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="border-b-2">Detail</div>

            <div className="grid grid-cols-2 grid-rows-2 gap-2 space-y-1 mt-6">
              <input
                type="text"
                placeholder="Book author"
                required
                className="bg-transparent outline-none border-b-2 focus:border-b-blue-600"
              ></input>
              <input
                type="text"
                placeholder="Book_title"
                required
                className="bg-transparent outline-none border-b-2 focus:border-b-blue-600"
              ></input>
              <input
                type="text"
                placeholder="Total pages"
                required
                className="bg-transparent outline-none border-b-2 focus:border-b-blue-600"
              ></input>
              <input
                type="text"
                placeholder="Publish date"
                required
                className="bg-transparent outline-none border-b-2 focus:border-b-blue-600"
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div>product_price</div>
            <div>quantity</div>
            <div className="col-span-2 text-center">Description</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
