import { useEffect, useState } from "react";

export const useEditorToolbar = () => {
  const [active, setActive] = useState({
    h1: false,
    h2: false,
    p: false,
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    align: "left" as "left" | "center" | "right",
    ul: false,
    ol: false,
  });

  const updateToolbar = () => {
    const formatBlock = document.queryCommandValue("formatBlock");

    setActive({
      h1: formatBlock === "h1",
      h2: formatBlock === "h2",
      p: formatBlock === "p",
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
      align: document.queryCommandState("justifyCenter")
        ? "center"
        : document.queryCommandState("justifyRight")
        ? "right"
        : "left",
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
    });
  };

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    updateToolbar();
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbar);
    return () =>
      document.removeEventListener("selectionchange", updateToolbar);
  }, []);

  return { active, exec };
};
