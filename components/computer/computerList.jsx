import ComputerItem from "./computerItem";

export default function ComputersList({ computers }) {
  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-2 justify-content-evenly">
        {computers.map((computer) => (
          <ComputerItem key={computer.ip} computer={computer} />
        ))}
      </div>

      <hr className="hr__computers" />
    </>
  );
}
