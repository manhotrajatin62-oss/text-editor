

const CustomModal = ({ showModal, setShowModal, children }: any) => {
  return (
    <>
      {showModal.open && (
        <div
          onClick={() => {
            setShowModal((prev: any) => ({ ...prev, open: false }));
          }}
          className="fixed top-0 right-0 bottom-0 left-0 bg-black/40"
        />
      )}

      <section
        className={`${showModal.open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} fixed top-[50%] left-[50%] z-98 w-[30%] translate-[-50%] rounded-xl bg-white p-6 transition-all duration-200`}
      >
       {children}
      </section>
    </>
  );
};

export default CustomModal;
