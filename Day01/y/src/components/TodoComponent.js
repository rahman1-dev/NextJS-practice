export default function TodoComponent({ details }) {
  //   console.log("I am called: ", details);
  const { title, completed } = details;
  return (
    <div className="bg-gray-700 text-black w-[70vw] flex justify-between p-3 rounded-sm">
      <h2>{title}</h2>
      <p>{completed ? "true" : "false"}</p>
    </div>
  );
}
