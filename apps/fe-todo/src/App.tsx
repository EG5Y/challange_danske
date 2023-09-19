import { ErrorMessage, Field, Form, Formik } from "formik";
import spinnerLogo from "../assets/spinner-solid.svg";
import xLogo from "../assets/x-solid.svg";
// import circleLogo from "../assets/circle-regular.svg";
// import cicleCheckLogo from "../assets/circle-check-regular.svg";
import React, { useState } from "react";

interface IListItem {
  text: string;
  done: boolean;
}

function ListItem({
  text,
  done,
  onDone,
  onRemove,
  onSave,
}: {
  text: string;
  done: boolean;
  onDone: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSave: (text: string) => void;
}) {
  const [isChanged, setIsChanged] = useState<string>("");

  return (
    <li className=" flex justify-between gap-4 pl-4 pr-4 py-2 bg-mid-one font-medium rounded-2xl relative   ">
      <input
        onChangeCapture={(event: React.FormEvent<HTMLInputElement>) => {
          setIsChanged(event.currentTarget.value);
        }}
        type="text"
        defaultValue={text}
        className="bg-transparent"
      />
      {isChanged ? (
        <button
          onClick={() => {
            onSave(isChanged);
            setIsChanged("");
          }}
          className="bg-blue-300 transition-shadow duration-300 hover:shadow-btn-one text-white font-black rounded-2xl px-4 py-1 "
        >
          SAVE
        </button>
      ) : (
        <button
          onClick={onDone}
          className={`${
            done
              ? "bg-green-300 transition-shadow duration-300 hover:shadow-btn-green  "
              : "bg-yellow-300 transition-shadow duration-300 hover:shadow-btn-yellow  "
          } text-white font-black rounded-2xl px-4 py-1`}
        >
          {done ? "COMPLETED" : "UNFINISHED"}
        </button>
      )}
      <button
        onClick={onRemove}
        className="transition-shadow duration-300 hover:shadow-btn-red absolute top-[-5px] right-[-5px] bg-red-300 text-white font-black rounded-2xl w-[20px] h-[20px] grid items-center justify-center text-[10px]  "
      >
        <img src={xLogo} alt="x" className="w-[8px]" />
      </button>
    </li>
  );
}

function App() {
  //const [count, setCount] = useState(0);

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
  // }

  const [listItems, setListItems] = useState<IListItem[]>([
    { text: "Example item one", done: true },
    { text: "Example item two", done: false },
  ]);

  return (
    <main className="mx-auto max-w-[400px] flex flex-col gap-4 text-dark-one">
      <header className="pt-10">
        <h1 className="text-[2rem]">Danske TODO</h1>
      </header>
      <hr />
      <section className=" flex flex-col gap-8 ">
        <Formik
          initialValues={{ text: "" }}
          onSubmit={async (
            { text },
            { setSubmitting, setValues, setErrors },
          ) => {
            setListItems([{ text, done: false }, ...listItems]);
            await setValues({ text: "" });
            setErrors({});
            setSubmitting(false);
          }}
          validate={({ text }) => {
            const errors: {
              text?: string;
            } = {};

            if (!text) {
              errors.text = "Text is required";
            }

            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex gap-4">
              <div className="border-b-2 border-dark-one w-full flex flex-col justify-end">
                <Field
                  type="text"
                  name="text"
                  placeholder="New TODO"
                  className=" w-full px-2"
                />
                <ErrorMessage
                  name="text"
                  component="div"
                  className="px-2 text-red-500 "
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 font-black bg-blue-300 text-white rounded transition-shadow duration-300 hover:shadow-btn-one fill-amber-500 "
              >
                {isSubmitting ? (
                  <img
                    src={spinnerLogo}
                    className=" animate-spin w-[45px] h-[24px] "
                    alt="Loading..."
                  />
                ) : (
                  "ADD"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <ul className=" flex flex-col gap-4 ">
          {listItems.map(({ text, done }, index) => (
            <ListItem
              key={text + index}
              done={done}
              text={text}
              onDone={() =>
                setListItems(
                  listItems.map((item, i) => {
                    if (i == index) {
                      return { ...item, done: !item.done };
                    } else {
                      return { ...item };
                    }
                  }),
                )
              }
              onRemove={() =>
                setListItems(listItems.filter((_item, i) => i != index))
              }
              onSave={(text) =>
                setListItems(
                  listItems.map((item, i) => {
                    if (i == index) {
                      return { ...item, text: text };
                    } else {
                      return { ...item };
                    }
                  }),
                )
              }
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
