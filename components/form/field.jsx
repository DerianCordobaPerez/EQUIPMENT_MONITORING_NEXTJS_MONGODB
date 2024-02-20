export default function Field({
  onChange,
  type,
  value,
  field: { uid, label, component },
}) {
  return (
    <div key={uid}>
      <label htmlFor={uid}>{label}</label>
      <input
        className="form-control mb-3"
        type={type || component}
        id={uid}
        name={uid}
        value={value}
        onChange={({ target }) => change(uid, target.value)}
      />
    </div>
  );
}
