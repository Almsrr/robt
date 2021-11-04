import { FC } from "react";

const someRecents = [
  { id: "2rd132s", title: "Web Developer" },
  { id: "2asd2s", title: "React Developer" },
];

const Recents: FC = function () {
  return (
    <ul>
      {someRecents.map((search) => (
        <li key={search.id}>{search.title}</li>
      ))}
    </ul>
  );
};

export default Recents;
