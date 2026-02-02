import ReadingProgress from "./components/ReadingProgress";
import TableOfContents from "./components/TableOfContents";

const tocItems = [
  { id: "intro", label: "Introduction" },
];

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Portfolio</h1>
        <TableOfContents items={tocItems} />
      </main>
      <ReadingProgress />
    </div>
  );
}
