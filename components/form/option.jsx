export default function Option({ field, fieldChanged, value }) {
  const { label, options, uid } = field

  return (
    <div className="form-check">
      <h4 className="text-muted">{label}</h4>
      {options.map((option) => {
        return (
          <label key={option.value} htmlFor={option.value}>
            <input
              type="radio"
              className="form-check-input"
              id={option.value}
              name={field.uid}
              value={option.value}
              checked={value === option.value}
              onChange={({ target }) => fieldChanged(uid, target.value)}
            />
            {option.label}
          </label>
        )
      })}
    </div>
  )
}
