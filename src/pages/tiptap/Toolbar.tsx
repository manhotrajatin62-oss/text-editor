import { Editor } from "@tiptap/react";
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiUnderline,
} from "react-icons/fi";
import { GoBold, GoItalic, GoStrikethrough } from "react-icons/go";
import { HiListBullet } from "react-icons/hi2";
import { PiListNumbers } from "react-icons/pi";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";
import { MdShortText } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoLink } from "react-icons/io5";

type Props = {
  editor: Editor;
};

let savedRange: Range | null = null;

const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
};

const insertLink = (text: string, url: string, editor: any) => {
  if (!editor) return;

  const { empty } = editor.state.selection;

  if (empty) {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text,
        marks: [
          {
            type: "link",
            attrs: {
              href: url,
              target: "_blank",
            },
          },
        ],
      })

      // .unsetLink()
      .run();
  } else {
    editor
      .chain()
      .focus()
      .setLink({
        href: url,
        target: "_blank",
      })
      .run();
  }
};

export default function Toolbar({ editor }: Props) {
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
          className="button text-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        <button
          className="button text-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          className="button text-sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>

        <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

        {/* font family */}
        <select
          className="button text-sm"
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          <option value="sans-serif">Sans Serif</option>
          <option value="Roboto">Roboto</option>
          <option value="monospace">Monospace</option>
        </select>

        {/* font size */}
        <select
          className="button text-sm"
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .setMark("textStyle", {
                fontSize: e.target.value,
              })
              .run()
          }
        >
          <option value="12px">Small</option>
          <option selected value="15px">
            Normal
          </option>
          <option value="18px">Large</option>
          <option value="24px">Huge</option>
        </select>
        <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

        {/* text styles */}
        <button
          className={`button ${editor.isActive('bold') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <GoBold />
        </button>

        <button
          className={`button ${editor.isActive('italic') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <GoItalic />
        </button>

        <button
          className="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FiUnderline />
        </button>

        <button
          className="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <GoStrikethrough />
        </button>

        <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

        <button
          className="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FiAlignLeft />
        </button>

        <button
          className="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FiAlignCenter />
        </button>

        <button
          className="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FiAlignRight />
        </button>

        <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

        <div title="Select Text Color" className="relative h-6 w-6">
          <input
            value={color}
            className="absolute inset-0 cursor-pointer opacity-0"
            type="color"
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run();
              setColor(e.target.value);
            }}
          />

          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="h-0.5 w-6 rotate-90 bg-gray-400" />

        {/* lists */}
        <button
          className="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <HiListBullet />
        </button>

        <button
          className="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
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
                editor
                  .chain()
                  .focus()
                  .setImage({ src: reader.result as string })
                  .run();
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
                    insertLink(inputName, inputLink, editor);
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
                  let editor = document.querySelector(".ProseMirror");
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
}
