import { useState } from "react";

export function useFormFields(initialState: Record<string, string>) {
  const [fields, setValues] = useState(initialState);

  const updater = function (event: React.ChangeEvent<HTMLInputElement>) {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  }
  
  return [
    fields,
    updater
  ] as const;
}