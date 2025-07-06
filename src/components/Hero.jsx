export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col justify-center items-center text-center px-4">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
          Take Control of Your <span className="text-emerald-400">Loans</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in delay-200">
          Effortlessly calculate your monthly payments and plan your finances
          better with our intuitive loan calculator.
        </p>

        <a
          href="#calculator"
          className="inline-block bg-emerald-500 text-black text-xl font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-emerald-400 transition-colors duration-300 animate-fade-in delay-400"
        >
          Start Calculating
        </a>
      </div>
    </section>
  );
}
