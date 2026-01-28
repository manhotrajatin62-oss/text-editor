import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useToolbarState } from "./useToolbarState";
import {
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const active = useToolbarState();

  return (
    <div className="mb-2 flex gap-2">
      <button
        className={active.bold ? "button active" : ""}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      >
        Undo
      </button>
      <button
        className={active.bold ? "button active" : ""}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      >
        Redo
      </button>
      <button
        className={active.bold ? "button active" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        Bold
      </button>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        Italic
      </button>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        Underline
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      >
        strikethrough
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      >
        code
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        }}
      >
        subscript
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        }}
      >
        superscript
      </button>
      <button
        onClick={() => {
          editor.update(() => {
            $setBlocksType($getSelection(), () => $createHeadingNode("h1"));
          });
        }}
      >
        h1
      </button>
      <button
        onClick={() => {
          editor.update(() => {
            $setBlocksType($getSelection(), () => $createHeadingNode("h2"));
          });
        }}
      >
        h2
      </button>
      <button
        onClick={() => {
          editor.update(() => {
            $setBlocksType($getSelection(), () => $createHeadingNode("h3"));
          });
        }}
      >
        h3
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      >
        unordered
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      >
        ordered
      </button>
      <button
        onClick={() => {
         editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);

        }}
      >
        remove list
      </button>
    </div>
  );
}
