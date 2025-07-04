import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      {/* Top Strip */}
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[14px]">Hello</p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="">
                  <Link
                    to="help-center"
                    className="hover:text-cyan-600 transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="">
                  <Link to="order-tracking" className="hover:text-cyan-600 transition">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigator */}
      <div className="header py-3">

      </div>
    </header>
  );
};
