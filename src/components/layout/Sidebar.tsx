import React from 'react';
import { RxDashboard, RxGear, RxLockClosed, RxPerson } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-base-100 min-h-screen p-4 shadow-xl flex-shrink-0">
      <div className="text-xl font-bold mb-6">PocketSeal</div>
      <ul className="menu menu-vertical w-full">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            <RxDashboard className="w-5 h-5" /> Dashboard
          </NavLink>
        </li>
        <li className="menu-title">
          <span>Administration</span>
        </li>
        <li>
          <details>
            <summary><RxGear className="w-5 h-5" /> Settings</summary>
            <ul>
              <li><NavLink to="/admin/settings/general" className={({ isActive }) => isActive ? 'active' : ''}>General</NavLink></li>
              <li><NavLink to="/admin/settings/api-keys" className={({ isActive }) => isActive ? 'active' : ''}>API Keys</NavLink></li>
            </ul>
          </details>
        </li>
        <li>
          <NavLink to="/admin/ng-words" className={({ isActive }) => isActive ? 'active' : ''}>
            <RxLockClosed className="w-5 h-5" /> NGワード管理
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
            <RxPerson className="w-5 h-5" /> ユーザー管理
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;