import { GoBold, GoItalic, GoStrikethrough } from "react-icons/go";
import { useEditorToolbar } from "../hooks/useEditorToolbar.ts";
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiUnderline,
} from "react-icons/fi";
import { useState } from "react";
import { HiListBullet } from "react-icons/hi2";
import { PiListNumbers } from "react-icons/pi";
import { FcAddImage } from "react-icons/fc";

const EditorOptions = () => {
  const { active, exec } = useEditorToolbar();
  const [color, setColor] = useState("#000000");

  return (
    <section className="flex items-center gap-2 rounded-md bg-[#f4f4f4] p-2 shadow shadow-gray-300">
      <button
        title="Big Heading"
        className={`button text-sm ${active.h1 ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("formatBlock", "h1");
        }}
      >
        H1
      </button>

      <button
        title="Small Heading"
        className={`button text-sm ${active.h2 ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("formatBlock", "h2");
        }}
      >
        H2
      </button>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <select
        title="Font Style"
        className="button text-sm"
        onChange={(e) => exec("fontName", e.target.value)}
      >
        <option value="sans-serif">Sans Serif</option>
        <option value="Roboto">Roboto</option>
        <option value="monospace">Monospace</option>
      </select>

      <select
        title="Font Size"
        className="button text-sm"
        onChange={(e) => exec("fontSize", e.target.value)}
      >
        <option value="2">Small</option>
        <option value="3">Normal</option>
        <option value="5">Large</option>
        <option value="7">Huge</option>
      </select>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <button
        title="Bold Text"
        className={`button ${active.bold ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("bold");
        }}
      >
        <GoBold />
      </button>

      <button
        title="Italic Text"
        className={`button ${active.italic ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("italic");
        }}
      >
        <GoItalic />
      </button>

      <button
        title="Underline Text"
        className={`button ${active.underline ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("underline");
        }}
      >
        <FiUnderline />
      </button>

      <button
        title="StrikeThrough Text"
        className={`button ${active.strike ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("strikeThrough");
        }}
      >
        <GoStrikethrough />
      </button>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <button
        title="Text Align Left"
        className={`button ${active.align === "left" ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("justifyLeft");
        }}
      >
        <FiAlignLeft />
      </button>

      <button
        title="Text Align Center"
        className={`button ${active.align === "center" ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("justifyCenter");
        }}
      >
        <FiAlignCenter />
      </button>

      <button
        title="Text Align Right"
        className={`button ${active.align === "right" ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("justifyRight");
        }}
      >
        <FiAlignRight />
      </button>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <div title="Select Text Color" className="relative h-6 w-6">
        <input
          type="color"
          className="absolute inset-0 cursor-pointer opacity-0"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            exec("foreColor", e.target.value);
          }}
        />

        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <button
        title="Unordered List"
        className={`button ${active.ul ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("insertUnorderedList");
        }}
      >
        <HiListBullet />
      </button>

      <button
        title="Ordered List"
        className={`button ${active.ol ? "active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          exec("insertOrderedList");
        }}
      >
        <PiListNumbers />
      </button>

      <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

      <div title="Upload Image" className="button relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              exec("insertImage", reader.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />

        <FcAddImage className="pointer-events-none" />
      </div>
    </section>
  );
};

export default EditorOptions;
