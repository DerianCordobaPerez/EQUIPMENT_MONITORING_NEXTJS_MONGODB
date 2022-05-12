export default function Select({ key, field, change, values }) {
  const { uid, label, options } = field
  const value = values[uid]
  const onChange = ({ target }) => change(uid, target.value)

  return (
    <div key={key}>
      <label htmlFor={uid}>{label}</label>
      <select id={uid} name={uid} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
