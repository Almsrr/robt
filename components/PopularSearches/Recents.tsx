import { FC } from "react";

const someRecents = [
  { id: "2rd132s", title: "Web Developer" },
  { id: "2asd2s", title: "React Developer" },
];

const Recents: FC = function () {
  return (
    <section>
      <h3 className="text-2xl font-bold">Recent searches</h3>
      <ul>
        {someRecents.map((search) => (
          <li key={search.id}>{search.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default Recents;
