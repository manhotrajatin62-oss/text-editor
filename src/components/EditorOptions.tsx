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
import { IoLink } from "react-icons/io5";
import CustomModal from "./CustomModal.tsx";
import { IoIosSearch } from "react-icons/io";
import { MdShortText } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

let savedRange: Range | null = null;

const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
};

const insertLink = (text: string, url: string) => {
  if (!savedRange) return;

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(savedRange);

  const a = document.createElement("a");
  a.href = url;
  a.textContent = text;
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  savedRange.deleteContents();
  savedRange.insertNode(a);

  savedRange.setStartAfter(a);
  savedRange.collapse(true);

  selection?.removeAllRanges();
  selection?.addRange(savedRange);
};

const EditorOptions = () => {
  const { active, exec } = useEditorToolbar();
  const [color, setColor] = useState("#000000");

  const [showModal, setShowModal] = useState({
    modalType: "link",
    open: false,
  });

  const [inputName, setInputName] = useState("");
  const [inputLink, setInputLink] = useState("");

  return (
    <>
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

        <button
          title="paragraph"
          className={`button text-sm ${active.p ? "active" : ""}`}
          onMouseDown={(e) => {
            e.preventDefault();
            exec("formatBlock", "p");
          }}
        >
          p
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
          <option selected value="3">Normal</option>
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

        <button
          title="Add link"
          className="button"
          onMouseDown={(e: any) => {
            e.preventDefault();
            saveSelection();
            setShowModal({
              modalType: "link",
              open: true,
            });
          }}
        >
          <IoLink />
        </button>

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

        <button
          title="Delete all data"
          className="button"
          onMouseDown={() => {
            setShowModal({
              modalType: "delete",
              open: true,
            });
          }}
        >
          <RiDeleteBin7Fill color="red" />
        </button>
      </section>

      <CustomModal showModal={showModal} setShowModal={setShowModal}>
        {showModal.modalType === "link" ? (
          <>
            <h2 className="font-semibold">Add link</h2>

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                setShowModal((prev: any) => ({ ...prev, open: false }));
              }}
              className="mt-4 flex flex-col items-start gap-2"
            >
              <div className="flex w-full items-center gap-2 rounded border border-gray-400 p-1">
                <MdShortText size={25} />
                <input
                  placeholder="Text"
                  className="input"
                  value={inputName}
                  onChange={(e: any) => setInputName(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>

              <div className="flex w-full items-center gap-2 rounded border border-gray-400 p-1">
                <IoIosSearch size={25} />
                <input
                  placeholder="Paste a link"
                  className="input"
                  value={inputLink}
                  onChange={(e: any) => setInputLink(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-5">
                <button
                  disabled={
                    inputName.trim().length < 1 || inputLink.trim().length < 1
                  }
                  onClick={() => {
                    insertLink(inputName, inputLink);
                  }}
                  className="cursor-pointer rounded bg-black px-3 py-2 text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-600"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setShowModal((prev: any) => ({ ...prev, open: false }));
                  }}
                  className="ml-2 cursor-pointer rounded px-3 py-2 text-sm text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-semibold">Delete all data</h2>

            <p className="mt-4">Are you sure you want to delete all data?</p>

            <div className="mt-5">
              <button
                onClick={() => {
                  let editor = document.getElementById("editor");
                  if (!editor) return;

                  editor.innerHTML = "";
                  setShowModal((prev: any) => ({ ...prev, open: false }));
                }}
                className="cursor-pointer rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => {
                  setShowModal((prev: any) => ({ ...prev, open: false }));
                }}
                className="ml-2 cursor-pointer rounded px-3 py-2 text-sm text-black"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </CustomModal>
    </>
  );
};

export default EditorOptions;
