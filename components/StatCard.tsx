export default function StatCard({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white border border-[#E4D5BE] p-6 shadow-sm">
      <p className="text-sm text-[#7A6B5B]">{title}</p>
      <p className="mt-3 text-4xl font-black">{value}</p>
      <p className="mt-2">{desc}</p>
    </div>
  );
}
