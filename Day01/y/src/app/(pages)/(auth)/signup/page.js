export default function SignUp() {
  return (
    <div className="h-[50%] flex flex-col justify-between mt-5">
      <input
        className="p-2 bg-gray-200 placeholder:text-gray-600 outline-none rounded-sm text-black"
        placeholder="Enter username"
        type="text"
      />
      <input
        className="p-2 bg-gray-200 placeholder:text-gray-600 outline-none rounded-sm text-black"
        placeholder="Email"
        type="email"
      />
      <input
        className="p-2 bg-gray-200 placeholder:text-gray-600 outline-none rounded-sm text-black"
        placeholder="Password"
        type="password"
      />
      <button className="bg-blue-500 rounded-sm p-2 hover:bg-blue-600 cursor-pointer">
        SignUp
      </button>
    </div>
  );
}
