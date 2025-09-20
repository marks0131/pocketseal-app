import { useRef, useCallback } from "react";
import "./Highlighter.css";

export type MarkerColor = "red" | "blue" | "green" | "yellow" | "gray" | "purered" | "unmarked";
export interface Marker {
  start: number;
  end: number;
  color: MarkerColor;
}

function getHighlightData(markerData: Marker[], index: number) {
  return (
    markerData.find(
      (marker) => index >= marker.start && index < marker.end
    ) || {
      start: -1,
      end: -1,
      color: "unmarked" as MarkerColor,
      markerNotice: "",
    }
  );
}

function getNextMarker(markerData: Marker[], index: number) {
  const nextMarker = markerData.find((marker) => marker.start > index);
  return nextMarker?.start;
}

interface Props {
  markerData: Marker[];
  text: string;
  setText: (text: string) => void;
  className?: string;
}

export default function Highlighter({ markerData, text, setText, className }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);

  const handleTextareaScroll = useCallback(() => {
    if (textareaRef.current && highlightLayerRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;
      highlightLayerRef.current.scrollTop = scrollTop;
      highlightLayerRef.current.scrollLeft = scrollLeft;
    }
  }, []);

  const renderText = (inputText: string) => {
    // inputTextを分析する
    // ダミーデータであるmarkerDataを使用して、特定の範囲をハイライトする
    // markerDataにはハイライトすべき範囲と色しか含まれていないので、"ハイライトすべき" "通常テキスト" を分けて考える

    // iはカーソル位置的な
    let i = 0;

    // ここにspan要素を貯めていく
    let spans = [];
    while (i < inputText.length) {
      const highlightData = getHighlightData(markerData, i);
      if (highlightData.color !== "unmarked") {
        // ここはハイライトすべきなので、ハイライト用のspanを追加
        const { start, end, color } = highlightData;
        spans.push(
          <span key={i} className={`highlight ${color}`}>
            {inputText.slice(start, end)}
          </span>
        );
        // ハイライト範囲の終わりまでシーク
        i = end;
      } else {
        // 次のマーカーまでを通常テキストとして追加
        const nextMarkerStart = getNextMarker(markerData, i) || inputText.length;
        spans.push(<span key={i}>{inputText.slice(i, nextMarkerStart)}</span>);
        // 次のマーカーまでシーク; なければテキストの終わりまで
        i = nextMarkerStart;
      }
    }
    return spans;
  };

  return (
    <>
      <div className={`highlighter-container ${className || ""}`}>
        <div 
          ref={highlightLayerRef}
          className="highlight-layer"
        >
          {renderText(text)}
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          onScroll={handleTextareaScroll}
          className="highlighter-textarea"
          spellCheck={false}
        ></textarea>
      </div>
    </>
  );
}