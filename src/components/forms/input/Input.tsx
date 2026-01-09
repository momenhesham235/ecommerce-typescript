import { Form } from "react-bootstrap";
import type { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TInputProps<TFieldValue extends FieldValues> = Readonly<{
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error: string;
  autoFocus?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
}>;

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  autoFocus,
  onBlur,
  formText,
  success,
  disabled,
}: TInputProps<TFieldValue>) => {
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
      register(name).onBlur(event);
    } else {
      register(name).onBlur(event);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${label}.....`}
        {...register(name)}
        onBlur={onBlurHandler}
        isInvalid={!!error}
        isValid={!!success}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      {formText && <Form.Text className="text-muted">{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;

/**
 * field values => اي شكل form data
 * Path<T> → يمنع كتابة اسم field غلط
 * UseFormRegister<T> → يربط input بالـ form
 */
