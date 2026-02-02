import Link from "next/link";

type TocItem = { id: string; label: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Table of contents" className="toc">
      <div className="toc-title">Contents</div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
