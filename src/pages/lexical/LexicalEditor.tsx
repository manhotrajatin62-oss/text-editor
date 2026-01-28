import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";

import Toolbar from "./Toolbar";

const theme = {
  paragraph: "editor-paragraph",
};

const editorConfig = {
  namespace: "Editor",
  theme,
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError(error: Error) {
    throw error;
  },
};

export default function LexicalEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border p-3">
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] outline-none" />
          }
          placeholder={<div className="text-gray-400">Start typing…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}
