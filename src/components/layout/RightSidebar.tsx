import { useEffect, useState } from "react";

const RightSidebar = () => {
  const [scratchPad, setScratchPad] = useState<string>('');

  useEffect(() => {
    const savedPad = localStorage.getItem('scratchPad');
    if (savedPad) {
      setScratchPad(savedPad);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scratchPad', scratchPad);
  }, [scratchPad]);
  
  return (
    <div className="w-80 bg-base-100 p-4 shadow-xl flex-shrink-0 overflow-y-auto">
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">スクラッチパッド</h3>
        <div className="card bg-base-200 p-4 rounded-box">
          <p className="font-semibold mb-2">ノート</p>
          <textarea
            value={scratchPad}
            onChange={(e) => setScratchPad(e.target.value)}
            placeholder="ここにメモ..."
            className="textarea textarea-bordered h-32 w-full"
          ></textarea>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">関連情報</h3>
        <div className="card bg-base-200 p-4 rounded-box">
          <p className="text-sm text-center text-base-content/70">
            ここに参照する情報やコンテキストが表示されます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;