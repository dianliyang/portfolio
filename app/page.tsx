
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
    body: "For collaborations or inquiries: hello@example.com",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-12 grid-background">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,210mm)_minmax(0,1fr)] gap-6 max-md:grid-cols-1 max-md:gap-6">
        <div className="max-md:hidden" aria-hidden="true" />
        <main
          className="paper a4-width mx-auto w-full"
          id="content"
        >
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
        <div className="max-md:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}
