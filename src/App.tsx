import { FcEditImage } from "react-icons/fc";
import EditorOptions from "./components/EditorOptions";
import Textarea from "./components/Textarea";

const App = () => {
  return (
    <>
      <main className="flex min-h-dvh items-center justify-center">
        <section className="mx-auto w-[85%] my-10 rounded-lg bg-white p-6 pb-0 shadow shadow-gray-400">

          <h1 className="text-xl flex items-center gap-2 font-semibold"><FcEditImage /> Text Editor</h1>

          <hr className="my-4 text-gray-300"/>
          <EditorOptions />
          <Textarea />
        <p className="text-sm my-2 text-center text-gray-500">Made by Jatin Manhotra</p>
        </section>

      </main>
    </>
  );
};

export default App;
