import { createTsForm, createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";
import { TextArea } from "../components/TextArea";
import { TextField } from "../components/TextField";
const textAreaSchema = createUniqueFieldSchema(
  z.string(),
  "tedasd" + new Date().getTime()
);

const mapping = [
  [z.string(), TextField] as const,
  [textAreaSchema, TextArea] as const
] as const;

const MyForm = createTsForm(mapping);

export default function Test() {
  return <MyForm schema={mapping} onSubmit={() => {}} />;
}
