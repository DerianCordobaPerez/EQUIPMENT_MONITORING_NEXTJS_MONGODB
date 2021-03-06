export default function Field({ field, change, type, value }) {
  const { uid, label, component } = field

  const onChange = ({ target }) => change(uid, target.value)

  return (
    <div key={uid}>
      <label htmlFor={uid}>{label}</label>
      <input
        className="form-control mb-3"
        type={type || component}
        id={uid}
        name={uid}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
