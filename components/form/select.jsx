import ReactSelect from 'react-select'
import { useRouter } from 'next/router'

export default function Select({ field, change, value }) {
  const { uid, label, options, multiple } = field
  const { pathname } = useRouter()

  const isEdit = pathname.includes('edit')

  const onChange = (option) => {
    const value = multiple ? option.map(({ value }) => value) : option.value
    change(uid, value)
  }

  const defaultValue = isEdit
    ? multiple
      ? value.map((value) => {
          const option = value.name || value
          return {
            value: option,
            label: `${option.charAt(0)}${option.slice(1)}`,
          }
        })
      : { label: `${value.charAt(0).toUpperCase()}${value.slice(1)}`, value }
    : null

  return (
    <>
      <label htmlFor={uid}>{label}</label>
      <ReactSelect
        className="mb-2"
        key={uid}
        name={uid}
        id={uid}
        onChange={onChange}
        options={options}
        isMulti={multiple}
        defaultValue={defaultValue}
      />
    </>
  )
}
