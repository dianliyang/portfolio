import ReadingProgress from "./components/ReadingProgress";
import TableOfContents from "./components/TableOfContents";

const sections = [
  {
    id: "intro",
    title: "Introduction",
    body:
      "I design and build digital products with a focus on clarity, restraint, and typographic rhythm.",
  },
  {
    id: "work",
    title: "Selected Work",
    body:
      "A small collection of systems, interfaces, and prototypes that favor legibility and composure over noise.",
  },
  {
    id: "notes",
    title: "Notes",
    body:
      "Short essays and project notes on interface mechanics, constraint-driven design, and maintaining quiet surfaces.",
  },
  {
    id: "contact",
    title: "Contact",
    body:
      "For collaborations or inquiries: hello@example.com",
  },
];

const tocItems = sections.map((section) => ({
  id: section.id,
  label: section.title,
}));

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] gap-10">
        <aside className="hidden lg:block">
          <TableOfContents items={tocItems} />
        </aside>
        <main className="paper">
          <h1 className="text-4xl font-semibold">Portfolio</h1>
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="paper-section"
            >
              <h2 id={`${section.id}-title`} className="text-2xl font-semibold">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink)]">
                {section.body}
              </p>
            </section>
          ))}
        </main>
        <aside className="hidden lg:flex justify-end">
          <ReadingProgress />
        </aside>
      </div>
    </div>
  );
}
