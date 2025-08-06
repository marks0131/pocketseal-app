import React from 'react';
import { NavLink } from 'react-router-dom';

interface LeftSidebarProps {
  threads: { id: string; name: string }[];
  onAddThread: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ threads, onAddThread }) => {
  return (
    <div className="w-64 bg-base-100 p-4 shadow-xl flex-shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">スレッド</div>
        <button onClick={onAddThread} className="btn btn-sm btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <ul className="menu bg-base-100 w-full rounded-box">
        {threads.map((thread) => (
          <li key={thread.id}>
            <NavLink
              to={`/thread/${thread.id}`}
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              {thread.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;