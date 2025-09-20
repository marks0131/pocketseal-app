import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import type { Message, MessagePart } from '../../types';
import './ChatInput.css';
import Highlighter, { type Marker, type MarkerColor } from './Highlighter';

interface ChatInputProps {
  onSendMessage: (userMessage: Message, aiResponse: Message) => void;
  threadId: string;
}

const getClassNameForEntity = (entity: string): MarkerColor => {
  switch (entity) {
    case 'ORG': return 'red';
    case 'P': return 'red';
    case 'O': return 'red';
    case 'PRD': return 'blue';
    case 'PER': return 'green';
    case 'LOC': return 'yellow';
    default: return 'gray';
  }
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, threadId }) => {
  const [isSending, setIsSending] = useState(false);
  const [editorText, setEditorText] = useState('');
  const [markerData, setMarkerData] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchAndApplyHighlights = async () => {

      try {
        const nerResponse = await axios.post('http://127.0.0.1:8000/ner_text', {
          text: editorText,
        });
        const parts: MessagePart[] = nerResponse.data;
        // TODO: partsをmarkerDataに代入する処理を書く
        setMarkerData(parts.map(part => ({
          start: part.start,
          end: part.end,
          color: getClassNameForEntity(part.entity_group),
        })))
      } catch (error) {
        console.error("リアルタイム解析エラー:", error);
      }
    };
    fetchAndApplyHighlights();
  }, [editorText]);
  
  const handleSubmit = async () => {
    const trimmedInput = editorText.trim();
    if (!trimmedInput) return;

    setIsSending(true);

    try {
      const userNerResponse = await axios.post(`http://127.0.0.1:8000/ner_text`, { text: trimmedInput });
      const userProcessedParts: MessagePart[] = userNerResponse.data;
      const userMessage: Message = { sender: 'user', text: trimmedInput, response: userProcessedParts };

      const messageResponse = await axios.post(`http://127.0.0.1:8000/thread/${threadId}/message`, { content: trimmedInput });
      const aiPlainText = messageResponse.data.content;

      const aiNerResponse = await axios.post(`http://127.0.0.1:8000/ner_text`, { text: aiPlainText });
      const aiProcessedParts: MessagePart[] = aiNerResponse.data;
      const aiResponse: Message = { sender: 'ai', text: aiPlainText, response: aiProcessedParts };

      setEditorText('');
      setMarkerData([]);

      onSendMessage(userMessage, aiResponse);

    } catch (error) {
      console.error('メッセージの送受信中にエラーが発生しました:', error);
      toast.error('AIとの通信中にエラーが発生しました。');
    } finally {
      setIsSending(false);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };
    
    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
        editorElement.addEventListener('keydown', handleKeyDown as EventListener);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('keydown', handleKeyDown as EventListener);
      }
    };
  }, [isSending, handleSubmit]);

  return (
    <div className="p-4 border-t border-base-300 flex-shrink-0">
      <div className="flex items-end gap-2 p-2 rounded-lg border border-base-300 bg-base-100">
        {/* <EditorContent editor={editor} className="flex-grow max-h-40 overflow-y-auto" /> */}
        <Highlighter markerData={markerData} text={editorText} setText={(v) => setEditorText(v)} className="flex-grow max-h-40" />
        <button
          onClick={handleSubmit}
          className="btn btn-primary btn-square"
          disabled={isSending || !editorText.trim()}
        >
          {isSending ? <span className="loading loading-spinner" /> : <FiSend className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;