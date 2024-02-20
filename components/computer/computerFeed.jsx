import Link from "next/link";
import ComputersList from "./computerList";
import NotFoundComputers from "./notFoundComputers";

export default function ComputersFeed({ computers }) {
  if (computers.length > 0) {
    return <ComputersList computers={computers} />;
  }
  return <NotFoundComputers />;
}
