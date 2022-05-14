import Field from './field'

export default function FieldGroup({ field, change, values }) {
  const { fields, uid, label } = field

  return (
    <fieldset key={uid}>
      <legend>{label}</legend>
      {fields.map((field) => (
        <Field key={uid} field={field} change={change} value={values[uid]} />
      ))}
    </fieldset>
  )
}
