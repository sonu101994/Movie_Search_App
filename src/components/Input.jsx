export default function Input({ value, setValue, onSearch }) {

  return (
    <input
      type="text"
      value={value} // value comes from parent state
      onChange={(e) => setValue(e.target.value)} // Sync input changes with parent state
      onKeyDown={(e) => e.key === "Enter" && onSearch()} // Trigger search on Enter key press
      className="w-100 p-2 border rounded-3"
      placeholder="Search movies..." 
    />
  );
}