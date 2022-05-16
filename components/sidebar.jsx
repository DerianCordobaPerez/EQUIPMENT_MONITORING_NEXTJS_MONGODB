export default function Sidebar({ children, toggle }) {
  return (
    <>
      <div className={`${toggle ? 'aside__background__cover' : ''}`}></div>
      <div
        className={`aside__computers rounded ${
          !toggle ? 'hide' : 'show'
        }__aside__computers`}
      >
        {children}
      </div>
    </>
  )
}
