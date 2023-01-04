import { useTsController } from "@ts-react/form";
import { InputHTMLAttributes, useCallback } from "react";

export function TextField(
  props: InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { onChange, onBlur, readOnly, label, ...spreadProps } = props;
  const { field, error } = useTsController<number | string>();
  const handleChange: InputHTMLAttributes<
    HTMLInputElement
  >["onChange"] = useCallback(
    (e) => {
      const val = (e.target as any).value;
      field.onChange(val && typeof val !== "boolean" ? val : undefined);
      onChange?.(e);
    },
    [field.onChange, onChange]
  );
  const handleBlur: InputHTMLAttributes<
    HTMLInputElement
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
      <input
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
