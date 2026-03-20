import type { FaqItem } from "@/lib/types";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.id}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
