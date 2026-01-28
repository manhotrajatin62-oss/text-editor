import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Toolbar from "./Toolbar";
import { FcEditImage } from "react-icons/fc";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { Extension } from '@tiptap/core'

const FontSize = Extension.create({
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {}
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
})

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
  });

  if (!editor) return null;

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <section className="mx-auto my-10 w-[85%] rounded-lg bg-white p-6 pb-0 shadow shadow-gray-400">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <FcEditImage /> TipTap Text Editor
        </h1>

        <hr className="my-4 text-gray-300" />
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
        <p className="my-2 text-center text-sm text-gray-500">
          Made by Jatin Manhotra
        </p>
      </section>
    </main>
  );
}
