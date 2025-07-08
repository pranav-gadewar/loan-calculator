export default function About() {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center text-center px-4 py-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        About <span className="text-emerald-400">Us</span>
      </h2>

      <p className="text-lg md:text-xl max-w-3xl text-gray-300 mb-8">
        At <span className="text-emerald-400 font-semibold">BudgetBuddy</span>, we help you make smarter financial decisions by providing an intuitive, easy-to-use loan calculator. Whether you're planning for a home, car, business, or education, our tool ensures you understand your repayments, interest, and total cost clearly.
      </p>

      <p className="text-lg md:text-xl max-w-3xl text-gray-300">
        Our mission is to empower individuals and businesses by providing transparency and confidence in their borrowing decisions.
      </p>
    </section>
  );
}
