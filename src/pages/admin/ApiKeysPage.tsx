import React, { useState } from 'react';
import { RxGear, RxTrash, RxClipboardCopy } from 'react-icons/rx'; // RxKeyをRxGearに修正
import { toast } from 'react-hot-toast';

interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
}

const ApiKeysPage = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const handleCreateApiKey = () => {
    const newKey = `sk-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    const newApiKeyData = {
      id: `proj-${Date.now().toString().slice(-6)}`,
      key: newKey,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setApiKeys([...apiKeys, newApiKeyData]);
    toast.success('新しいAPIキーが作成されました！');
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast('APIキーを削除しました。', { icon: '🗑️' });
  };

  const handleCopyApiKey = (keyToCopy: string) => {
    navigator.clipboard.writeText(keyToCopy)
      .then(() => toast.success('APIキーをクリップボードにコピーしました！'))
      .catch(() => toast.error('コピーに失敗しました。'));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">API keys</h1>

      <div className="bg-base-100 p-6 rounded-box shadow-md mb-6">
        <p className="text-sm text-base-content/80 mb-4">
          You can create a new project if you don't have one already or add API keys to an existing project. All projects are subject to the <a href="#" className="link link-hover text-primary">Google Cloud Platform Terms of Service</a>.
        </p>
        <p className="text-sm text-base-content/80">
          If you use Gemini API from a project that has billing enabled, your use will be subject to <a href="#" className="link link-hover text-primary">pay-as-you-go pricing</a>.
        </p>
      </div>

      <div className="bg-base-100 p-6 rounded-box shadow-md mb-6">
        <button className="btn btn-primary" onClick={handleCreateApiKey}>
          <RxGear className="w-5 h-5 mr-2" /> Create API key
        </button>
      </div>

      <div className="bg-base-100 p-6 rounded-box shadow-md">
        <h2 className="text-xl font-semibold mb-3">Your API keys</h2>
        {apiKeys.length === 0 ? (
          <p className="text-center py-8 text-base-content/70">
            Create an API key to see your projects
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>API Key</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.id}</td>
                    <td>
                      <span className="font-mono">{key.key.substring(0, 4)}...{key.key.substring(key.key.length - 4)}</span>
                    </td>
                    <td>{key.createdAt}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="btn btn-ghost btn-xs text-primary" onClick={() => handleCopyApiKey(key.key)}>
                          <RxClipboardCopy className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDeleteApiKey(key.id)}>
                          <RxTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeysPage;