export default function Footer() {
    return (
        <footer
            id="footer"
            className="bg-black text-gray-400 text-center py-6 mt-auto"
        >
            <p className="text-lg">
                © {new Date().getFullYear()} <span className="text-emerald-400">BudgetBuddy</span>.
                Built to help you make smarter financial decisions.
            </p>

            <p className="mt-2 text-sm">
                Website crafted by <span className="text-white text-lg font-medium">Pranav Gadewar</span>
            </p>

            <p className="mt-1 text-sm">
                📧 <a href="mailto:gadewar.pranav03@gmail.com" className="text-emerald-400 hover:underline">
                    gadewar.pranav03@gmail.com
                </a> | ☎️ <a href="tel:+919607622072" className="text-emerald-400 hover:underline">
                    +91-9607622072
                </a>
            </p>

            <div className="mt-2 flex justify-center gap-6 text-lg">
                <a
                    href="https://www.linkedin.com/in/pranav-gadewar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400"
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/pranav-gadewar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400"
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}
