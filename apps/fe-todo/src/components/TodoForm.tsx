import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import spinnerLogo from "../../assets/spinner-solid.svg";
import { IListItem } from "../App.tsx";

export function TodoForm({
  items,
  setItems,
}: {
  items: IListItem[];
  setItems: React.Dispatch<IListItem[]>;
}) {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }, { setSubmitting, setValues, setErrors }) => {
        const items_req = await axios.post("http://localhost:3000/", {
          text,
          done: false,
        });

        setItems([{ text, done: false, id: items_req.data }, ...items]);
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
  );
}
