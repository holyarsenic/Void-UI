"use client";

import Editor from "@monaco-editor/react";

const UiEditor = () => {

  return (
    <div className="h-screen w-full">
      <Editor
        height="50%"
        language="javascript"
        width="50%"
        options={{
          minimap: {enabled: false},
          fontSize: 14,
          lineHeight: 21,
          padding:{ top: 20, bottom: 20},
          roundedSelection: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          scrollbar: {verticalScrollbarSize: 1, horizontalScrollbarSize: 1},
        }}
        defaultLanguage="javascript"
        defaultValue={`export default function App() {
  return <h1>Hello VOI UI</h1>;
}`}
        theme="vs-dark"
      />
    </div>
  );
};

export default UiEditor;