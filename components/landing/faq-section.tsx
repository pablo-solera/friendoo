import { faqs } from "@/components/landing/landing-data";

export function FaqSection() {
  return (
    <section id="preguntas-frecuentes" className="bg-[#14213d] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffe66d]">FAQ</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Preguntas frecuentes</h2>
        </div>

        <div className="mt-10 divide-y divide-white/12 rounded-[2rem] bg-white/7 px-5 shadow-[0_28px_90px_rgba(0,0,0,0.12)] ring-1 ring-white/12 backdrop-blur md:px-7">
          {faqs.map((faq) => (
            <article key={faq.question} className="py-6 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:py-7">
              <h3 className="text-xl font-black leading-tight tracking-tight">{faq.question}</h3>
              <p className="mt-3 leading-7 text-white/68 md:mt-0">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
