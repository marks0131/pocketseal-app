import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const initialUsers: User[] = [
  { id: 1, name: 'marks0131', email: 'marks@example.com', role: 'admin' },
  { id: 2, name: '一般ユーザーA', email: 'user-a@example.com', role: 'user' },
  { id: 3, name: '一般ユーザーB', email: 'user-b@example.com', role: 'user' },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast('ユーザーを削除しました。', { icon: '🗑️' });
  };

  const handleEditRole = (id: number, newRole: 'admin' | 'user') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast.success('ユーザー権限を変更しました。');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ユーザー管理</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">ユーザーリスト</h2>
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>名前</th>
                  <th>メールアドレス</th>
                  <th>権限</th>
                  <th className="w-20">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select 
                        className="select select-bordered select-xs"
                        value={user.role}
                        onChange={(e) => handleEditRole(user.id, e.target.value as 'admin' | 'user')}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDeleteUser(user.id)}>
                        削除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;