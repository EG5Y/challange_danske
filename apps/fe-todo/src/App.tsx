import { useEffect, useState } from "react";
import axios from "axios";
import { TodoForm } from "./components/TodoForm.tsx";
import { TodoList } from "./components/TodoList.tsx";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listItems, setListItems] = useState<IListItem[]>([]);

  useEffect(() => {
    (async () => {
      const items_req = await axios.get("http://localhost:3000/");
      const items = (items_req.data as IListItemDB[]).sort(
        (a, b) => b.created - a.created,
      );
      setListItems(items);
      setIsLoading(false);
    })();
  }, []);

  return (
    <main className="mx-auto max-w-[400px] flex flex-col gap-4 text-dark-one">
      {isLoading ? (
        <div className="">
          <h1 className="text-2xl ">Connecting to backend...</h1>
        </div>
      ) : (
        <>
          <header className="pt-10 flex justify-between items-center">
            <h1 className="text-[2rem]">Danske TODO</h1>
            <p className="px-4 text-2xl">{listItems.length}</p>
          </header>
          <hr />
          <section className=" flex flex-col gap-8 ">
            <TodoForm items={listItems} setItems={setListItems} />
            <TodoList items={listItems} setItems={setListItems} />
          </section>
        </>
      )}
    </main>
  );
}

export interface IListItem {
  id: string;
  text: string;
  done: boolean;
}
export interface IListItemDB {
  id: string;
  text: string;
  done: boolean;
  created: number;
}

export default App;
