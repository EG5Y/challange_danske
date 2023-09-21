import { ListItem } from "./ListItem.tsx";
import axios from "axios";
import { IListItem } from "../App.tsx";

export function TodoList({
  items,
  setItems,
}: {
  items: IListItem[];
  setItems: React.Dispatch<IListItem[]>;
}) {
  return (
    <ul className=" flex flex-col gap-4 ">
      {items.length < 1
        ? "No todo items added."
        : items.map(({ text, done, id }, index) => (
            <ListItem
              key={text + index}
              done={done}
              text={text}
              onDone={async () => {
                await axios.post(`http://localhost:3000/update/${id}`, {
                  done: !done,
                });
                setItems(
                  items.map((item, i) => {
                    if (i == index) {
                      return { ...item, done: !done };
                    } else {
                      return { ...item };
                    }
                  }),
                );
              }}
              onRemove={async () => {
                await axios.post(`http://localhost:3000/remove/${id}`);
                setItems(items.filter((_item, i) => i != index));
              }}
              onSave={async (text) => {
                await axios.post(`http://localhost:3000/update/${id}`, {
                  text,
                });
                setItems(
                  items.map((item, i) => {
                    if (i == index) {
                      return { ...item, text: text };
                    } else {
                      return { ...item };
                    }
                  }),
                );
              }}
            />
          ))}
    </ul>
  );
}
