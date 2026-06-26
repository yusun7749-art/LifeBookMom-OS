export default function QuickButton({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="rounded-2xl bg-[#EFF8F2] p-4 font-bold hover:bg-[#DFF1E7]"
    >
      {label}
    </a>
  );
}
