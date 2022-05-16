import ReactSelect from 'react-select'

export default function Select({ field, change }) {
  const { uid, label, options, multiple } = field

  const onChange = (option) => {
    const value = multiple ? option.map(({ value }) => value) : option.value
    change(uid, value)
  }

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
      />
    </>
  )
}
