import Field from "./field";

export default function FieldGroup({
  onChange,
  values,
  field: { fields, uid, label },
}) {
  return (
    <fieldset key={uid}>
      <legend>{label}</legend>
      {fields.map((field) => (
        <Field
          key={uid}
          field={field}
          onChange={onChange}
          value={values[uid]}
        />
      ))}
    </fieldset>
  );
}
