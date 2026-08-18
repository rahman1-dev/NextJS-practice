export default function authLayout({ children }) {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white text-black rounded-2xl flex flex-col items-center justify-center h-[70vh] w-[50vw] ">
        <h1>This is authentication layout</h1>
        {children}
      </div>
    </div>
  );
}
