import { useTsController } from "@ts-react/form";
import { InputHTMLAttributes, useCallback } from "react";

export function TextArea(
  props: InputHTMLAttributes<HTMLTextAreaElement> & { label?: string }
) {
  const { onChange, onBlur, readOnly, label, ...spreadProps } = props;
  const { field, error } = useTsController<number | string>();
  const handleChange: InputHTMLAttributes<
    HTMLTextAreaElement
  >["onChange"] = useCallback(
    (e) => {
      const val = (e.target as any).value;
      field.onChange(val && typeof val !== "boolean" ? val : undefined);
      onChange?.(e);
    },
    [field.onChange, onChange]
  );
  const handleBlur: InputHTMLAttributes<
    HTMLTextAreaElement
  >["onBlur"] = useCallback(
    (e) => {
      field.onBlur();
      onBlur?.(e);
    },
    [field.onBlur, onBlur]
  );

  return (
    <div>
      <label>{label}</label>
      <textarea
        value={field.value ? field.value + "" : ""}
        {...(readOnly
          ? {
              onChange: handleChange,
              onBlur: handleBlur
            }
          : {})}
        readOnly={readOnly || false}
        name={field.name}
        {...spreadProps}
      />
      {error && <span>{error.errorMessage}</span>}
    </div>
  );
}
