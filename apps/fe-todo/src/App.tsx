import { ErrorMessage, Field, Form, Formik } from "formik";
import spinnerLogo from "../assets/spinner-solid.svg";
import xLogo from "../assets/x-solid.svg";
// import circleLogo from "../assets/circle-regular.svg";
// import cicleCheckLogo from "../assets/circle-check-regular.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface IListItem {
  id: string;
  text: string;
  done: boolean;
}
interface IListItemDB {
  id: string;
  text: string;
  done: boolean;
  created: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listItems, setListItems] = useState<IListItem[]>([]);

  useEffect(() => {
    (async () => {
      const items_req = await axios.get("http://localhost:3000/");
      const items = (items_req.data as IListItemDB[]).sort(
        (a, b) => b.created - a.created,
      );
      console.log(items);
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
            <Formik
              initialValues={{ text: "" }}
              onSubmit={async (
                { text },
                { setSubmitting, setValues, setErrors },
              ) => {
                const items_req = await axios.post("http://localhost:3000/", {
                  text,
                  done: false,
                });

                setListItems([
                  { text, done: false, id: items_req.data },
                  ...listItems,
                ]);
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
                  <div className="border-b-2 border-dark-one w-full h-[40px] flex flex-col justify-end">
                    <ErrorMessage
                      name="text"
                      component="div"
                      className="px-2 text-red-500 text-sm"
                    />
                    <Field
                      type="text"
                      name="text"
                      placeholder="New TODO"
                      className=" w-full px-2"
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
              {listItems.length < 1
                ? "No todo items added."
                : listItems.map(({ text, done, id }, index) => (
                    <ListItem
                      key={text + index}
                      done={done}
                      text={text}
                      onDone={async () => {
                        await axios.post(`http://localhost:3000/update/${id}`, {
                          done: !done,
                        });
                        setListItems(
                          listItems.map((item, i) => {
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
                        setListItems(
                          listItems.filter((_item, i) => i != index),
                        );
                      }}
                      onSave={async (text) => {
                        await axios.post(`http://localhost:3000/update/${id}`, {
                          text,
                        });
                        setListItems(
                          listItems.map((item, i) => {
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
          </section>
        </>
      )}
    </main>
  );
}

export default App;
