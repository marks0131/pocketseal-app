import React from 'react';
import { RxBell } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md flex-shrink-0">
      <div className="navbar-start">
        <Link to="/admin" className="btn btn-ghost text-xl">
          PocketSeal Admin
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/" className="btn btn-ghost">
          アプリに戻る
        </Link>
        <button className="btn btn-ghost btn-circle">
          <RxBell className="w-5 h-5" />
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;