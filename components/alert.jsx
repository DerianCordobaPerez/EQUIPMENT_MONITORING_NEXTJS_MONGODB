export default function Alert({ type, dismissible, children }) {
  return (
    <div
      class={`alert alert-${type} ${
        dismissible && 'alert-dismissible'
      } fade show`}
      role="alert"
    >
      {children}

      {dismissible && (
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      )}
    </div>
  )
}
