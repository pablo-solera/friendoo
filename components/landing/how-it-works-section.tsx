import { steps } from "@/components/landing/landing-data";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff4f5e]">Cómo funciona</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tres pasos. Sin complicaciones.</h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="absolute left-1/2 top-8 hidden h-px w-[68%] -translate-x-1/2 bg-[#17120f]/12 md:block" />
          {steps.map((step, index) => (
            <article key={step.number} className="relative text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full border border-[#17120f]/10 bg-[#fff7ea] text-lg font-black shadow-[0_16px_42px_rgba(20,33,61,0.08)]">
                <span className={index === 0 ? "text-[#ff4f5e]" : index === 1 ? "text-[#0f766e]" : "text-[#b45309]"}>
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-black tracking-tight">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-7 text-[#17120f]/62">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
