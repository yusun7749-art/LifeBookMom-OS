import { osLocks } from "../../data/v4/osLocks";

export default function OSLockPanel() {
  return (
    <section className="rounded-[2rem] border border-[#E4D5BE] bg-white p-7">
      <h2 className="text-3xl font-black">🔒 OS LOCK</h2>
      <p className="mt-2 text-[#7A6B5B]">
        생활백서맘이 아닌 결과를 출력하지 못하게 막는 핵심 규칙입니다.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {osLocks.locks.map((lock) => (
          <div key={lock.id} className="rounded-3xl bg-[#FFFDF8] p-5">
            <p className="text-sm font-black text-[#B35C3D]">{lock.id}</p>
            <p className="mt-2 text-xl font-black">{lock.name}</p>
            <p className="mt-3 text-sm font-bold leading-6 text-[#6F6255]">{lock.rule}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
