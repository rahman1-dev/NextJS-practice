export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col gap-7 justify-center items-center text-xl bg-amber-700 ">
      <h1 className="text-2xl text-white ">SingUp</h1>
      <input
        className="bg-white text-black placeholder:text-gray-700 p-3 rounded-sm outline-none"
        placeholder="Enter username"
        type="text"
      />
      <input
        className="bg-white text-black placeholder:text-gray-700 p-3 rounded-sm outline-none"
        placeholder="Enter email"
        type="email"
      />
      <input
        className="bg-white text-black placeholder:text-gray-700 p-3 rounded-sm outline-none"
        placeholder="Enter password"
        type="password"
      />
      <button className="bg-amber-600 p-3 rounded-sm">Signup</button>
    </div>
  );
}
