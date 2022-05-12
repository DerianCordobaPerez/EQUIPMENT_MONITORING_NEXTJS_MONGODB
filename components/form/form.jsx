import { useState } from 'react'
import Field from './field'
import FieldGroup from './fieldGroup'
import Select from './select'

export default function Form({ data, onSubmit }) {
  const { fields, label } = data

  const [values, setValues] = useState({})

  const fieldChange = (uid, value) => {
    setValues({ ...values, [uid]: value })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>{label}</h2>

      {fields.map((field) => {
        switch (field.component) {
          case 'field_group':
            return (
              <FieldGroup
                key={field.uid}
                field={field}
                change={fieldChange}
                values={values}
              />
            )
          case 'select':
            return (
              <Select
                key={field.uid}
                field={field}
                change={fieldChange}
                values={values}
              />
            )
          default:
            return (
              <Field
                key={field.uid}
                field={field}
                change={fieldChange}
                values={values[field.uid]}
              />
            )
        }
      })}

      <button type="submit">Submit</button>
    </form>
  )
}
