export default function Header({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-5xl font-black">{title}</h2>
      <p className="mt-4 text-xl text-[#6F6255]">{text}</p>
    </div>
  );
}
