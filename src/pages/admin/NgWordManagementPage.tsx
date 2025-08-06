import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface NgWord {
  id: number;
  word: string;
  description: string;
}

const initialNgWords: NgWord[] = [
  { id: 1, word: '社外秘', description: '機密情報に関する単語' },
  { id: 2, word: '個人情報', description: '個人を特定できる情報' },
  { id: 3, word: '給与', description: '給与に関する情報' },
];

const NgWordManagementPage = () => {
  const [ngWords, setNgWords] = useState(initialNgWords);
  const [newWord, setNewWord] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddNgWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() === '') {
      toast.error('NGワードを入力してください。');
      return;
    }
    const newId = ngWords.length > 0 ? Math.max(...ngWords.map(w => w.id)) + 1 : 1;
    setNgWords([...ngWords, { id: newId, word: newWord, description: newDescription }]);
    setNewWord('');
    setNewDescription('');
    toast.success('NGワードを追加しました。');
  };

  const handleDeleteNgWord = (id: number) => {
    setNgWords(ngWords.filter(word => word.id !== id));
    toast('NGワードを削除しました。', { icon: '🗑️' });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">NGワード管理</h1>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">NGワードリスト</h2>
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>NGワード</th>
                  <th>説明</th>
                  <th className="w-20">操作</th>
                </tr>
              </thead>
              <tbody>
                {ngWords.map(word => (
                  <tr key={word.id}>
                    <td>{word.word}</td>
                    <td>{word.description}</td>
                    <td>
                      <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDeleteNgWord(word.id)}>
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

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">NGワードを追加</h2>
          <form onSubmit={handleAddNgWord} className="form-control mt-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="NGワード"
                className="input input-bordered w-full max-w-xs"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
              />
              <input
                type="text"
                placeholder="説明 (任意)"
                className="input input-bordered w-full"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                追加
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NgWordManagementPage;