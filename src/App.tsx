import { useState } from "react";
import { List } from "lucide-react";
import { cn } from "./lib/utils";

const DEFAULT_ITEMS = [
  { id: "1", text: "One", checked: true },
  { id: "2", text: "Two", checked: true },
  { id: "3", text: "Three", checked: true },
  { id: "4", text: "Four", checked: false },
  { id: "5", text: "Five", checked: true },
  { id: "6", text: "Six", checked: true },
  { id: "7", text: "Seven", checked: true },
];

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  const handleChange = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  return (
    <main className="container mx-auto p-24 flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col rounded bg-white px-3 py-4 shadow-xl">
        <p className="ml-2 flex items-center text-lg font-semibold text-gray-700">
          <List className="mr-3" size={24} />
          Checklist
        </p>
        <div className="mt-4">
          {items.map((item) => (
            <label
              key={item.id}
              className={cn(
                "group flex w-full cursor-pointer select-none items-center rounded p-2 text-md font-medium transition-colors duration-300 checked:text-gray-300 hover:bg-gray-100 text-gray-800",
                { "text-gray-400 line-through": item.checked }
              )}
            >
              <input
                className="mr-4 h-4 w-4 rounded-sm border-2 border-gray-300 text-sky-600 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-sky-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:checked:text-sky-600/25"
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChange(item.id)}
              />
              {item.text}
            </label>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
