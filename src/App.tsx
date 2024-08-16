import { useState } from "react";
import { List } from "lucide-react";
import { cn } from "./lib/utils";
import { stagger, useAnimate } from "framer-motion";

const DEFAULT_ITEMS = [
  { id: "1", text: "Task One", checked: true },
  { id: "2", text: "Task Two", checked: true },
  { id: "3", text: "Task Three", checked: true },
  { id: "4", text: "Task Four", checked: false },
  { id: "5", text: "Task Five", checked: true },
  { id: "6", text: "Task Six", checked: true },
  { id: "7", text: "Task Seven", checked: true },
];

function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  const [ref, animate] = useAnimate();

  const handleChange = (id: string) => {
    const _items = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(_items);

    if (_items.every((item) => item.checked)) {
      const lastCheckedItem = items.findIndex((item) => !item.checked);

      const effects = [
        // Bounce
        { scale: [1, 1.25, 1] },
        // Shimmer
        { x: [0, 2.5, -2.5, 0] },
        // Shake
        { rotate: [0, 15, -15, 0] },
      ];

      const delay = stagger(0.1, { from: lastCheckedItem });

      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      animate("input", randomEffect, { duration: 0.4, delay: delay });
    }
  };

  const progress = Math.round(
    (items.reduce((acc, item) => (item.checked ? acc + 1 : acc), 0) /
      items.length) *
      100
  );

  return (
    <main className="container mx-auto p-24 flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col rounded bg-white px-3 py-4 shadow-xl">
        <p className="ml-2 flex items-center text-lg font-semibold text-gray-700">
          <List className="mr-3" size={24} />
          Checklist
        </p>
        <div className="mx-2 mt-3 text-sm text-gray-400 flex gap-2 items-center">
          <p className="w-[5ch]">{progress}%</p>
          <div className="w-full h-[1ch] rounded-xl bg-gray-200">
            <div
              className="h-full rounded-xl bg-green-600 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div ref={ref} className="mt-2">
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
