const Textarea = () => {
  return (
    <div
      contentEditable={true}
      className="mt-4 h-90 min-h-full w-full overflow-auto rounded border border-gray-300 p-2 outline-0"
      id="editor"
    ></div>
  );
};

export default Textarea;
