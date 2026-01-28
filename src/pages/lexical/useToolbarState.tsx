import { $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

export function useToolbarState() {
  const [editor] = useLexicalComposerContext();
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        setActive({
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          underline: selection.hasFormat("underline"),
        });
      });
    });
  }, [editor]);

  return active;
}
