import { FcEditImage } from "react-icons/fc";
import EditorOptions from "../components/EditorOptions";
import Textarea from "../components/Textarea";

const CustomEditor = () => {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <section className="mx-auto my-10 w-[85%] rounded-lg bg-white p-6 pb-0 shadow shadow-gray-400">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <FcEditImage /> Custom Text Editor
        </h1>

        <hr className="my-4 text-gray-300" />
        <EditorOptions />
        <Textarea />
        <p className="my-2 text-center text-sm text-gray-500">
          Made by Jatin Manhotra
        </p>
      </section>
    </main>
  );
};

export default CustomEditor;
