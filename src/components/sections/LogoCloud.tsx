const clients = [
  'Zimplats Holdings',
  'Innscor Africa',
  'Lafarge Zimbabwe',
  'ZINWA',
  'Trans-Limpopo Freight',
  'Mashonaland Tobacco',
  'Hwange Colliery',
  'Delta Beverages',
  'Econet Wireless',
  'NetOne Cellular',
]

export function LogoCloud() {
  return (
    <section className="border-y border-slate-100 bg-white py-12" aria-label="Our clients">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          Trusted by industry leaders across sub-Saharan Africa
        </p>
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="flex animate-scroll-x items-center gap-12 whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="inline-flex h-10 min-w-max items-center justify-center rounded-lg border border-slate-100 bg-slate-50 px-5 text-sm font-semibold text-slate-500"
                aria-hidden={i >= clients.length}
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
