import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Calculator() {
    const [selectedLoan, setSelectedLoan] = useState("Home Loan");
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [loanTermUnit, setLoanTermUnit] = useState("years");
    const [startDate, setStartDate] = useState("");
    const [currency, setCurrency] = useState("INR");
    const [emi, setEmi] = useState(null);
    const [sheetData, setSheetData] = useState(null);
    const [emiTimeline, setEmiTimeline] = useState([]);

    const loanCategories = [
        "Home Loan", "Personal Loan", "Car Loan", "Education Loan",
        "Business Loan", "Gold Loan", "Mortgage Loan",
        "Agriculture Loan", "Travel Loan", "Medical Loan"
    ];

    const currencySymbols = {
        INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥"
    };

    const calculateEMI = () => {
        const P = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        let term = parseFloat(loanTerm);

        if (loanTermUnit === "months") term = term / 12;

        if (
            isNaN(P) || isNaN(annualRate) || isNaN(term) ||
            P <= 0 || annualRate <= 0 || term <= 0 || !startDate
        ) {
            setEmi(null);
            setSheetData(null);
            setEmiTimeline([]);
            return;
        }

        const r = annualRate / 12 / 100;
        const n = term * 12;

        const numerator = P * r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;

        const calculatedEMI = numerator / denominator;

        setEmi(calculatedEMI.toFixed(2));

        const summary = [
            ["Loan Type", selectedLoan],
            ["Currency", currency],
            ["Start Date", startDate],
            ["Loan Amount", `${currencySymbols[currency]}${P.toFixed(2)}`],
            ["Interest Rate (%)", annualRate],
            ["Loan Term", `${loanTerm} ${loanTermUnit}`],
            ["Estimated EMI", `${currencySymbols[currency]}${calculatedEMI.toFixed(2)}`],
        ];
        setSheetData(summary);

        const timeline = [];
        const sDate = new Date(startDate);
        for (let i = 1; i <= n; i++) {
            const monthDate = new Date(sDate);
            monthDate.setMonth(monthDate.getMonth() + i - 1);
            const monthStr = monthDate.toISOString().split("T")[0];
            timeline.push({
                month: monthStr,
                emi: calculatedEMI.toFixed(2),
            });
        }
        setEmiTimeline(timeline);
    };

    const downloadExcelSheet = () => {
        if (!sheetData || !emiTimeline.length) return;

        const wb = XLSX.utils.book_new();
        const summarySheet = XLSX.utils.aoa_to_sheet([["Loan Summary"], [], ...sheetData]);
        XLSX.utils.book_append_sheet(wb, summarySheet, "Loan Summary");

        const emiBreakdown = [
            ["Month", "EMI"],
            ...emiTimeline.map(({ month, emi }) => [
                month, `${currencySymbols[currency]}${emi}`
            ])
        ];
        const emiSheet = XLSX.utils.aoa_to_sheet(emiBreakdown);
        XLSX.utils.book_append_sheet(wb, emiSheet, "EMI Breakdown");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${selectedLoan.replace(/\s/g, "_")}_Loan_Details.xlsx`);
    };

    return (
        <section
            id="calculator"
            className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-12"
        >
            <div className="max-w-3xl w-full space-y-6">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        Loan <span className="text-emerald-400">Calculator</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300">
                        Select a loan type, currency, and enter your details to calculate payments & preview/download your summary.
                    </p>
                </div>

                {/* Input Card */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">{selectedLoan}</h3>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            calculateEMI();
                        }}
                    >
                        <div className="flex gap-2">
                            <select
                                value={selectedLoan}
                                onChange={(e) => setSelectedLoan(e.target.value)}
                                className="p-3 rounded text-black w-1/2"
                            >
                                {loanCategories.map((loan) => (
                                    <option key={loan} value={loan}>{loan}</option>
                                ))}
                            </select>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="p-3 rounded text-black w-1/2"
                            >
                                {Object.keys(currencySymbols).map((cur) => (
                                    <option key={cur} value={cur}>{cur}</option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="number"
                            placeholder="Loan Amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            className="w-full p-3 rounded text-black"
                        />
                        <input
                            type="number"
                            placeholder="Interest Rate (%)"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full p-3 rounded text-black"
                        />
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Loan Term"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="w-2/3 p-3 rounded text-black"
                            />
                            <select
                                value={loanTermUnit}
                                onChange={(e) => setLoanTermUnit(e.target.value)}
                                className="w-1/3 p-3 rounded text-black"
                            >
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                            </select>
                        </div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 rounded text-black"
                        />
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-black font-semibold py-3 rounded hover:bg-emerald-400"
                        >
                            Calculate
                        </button>
                    </form>
                </div>

                {/* EMI Summary Card */}
                {emi && (
                    <div className="bg-gray-800 p-4 rounded shadow text-lg text-center">
                        <span className="text-emerald-400 font-semibold">
                            Your estimated monthly EMI: {currencySymbols[currency]}{emi}
                        </span>
                    </div>
                )}

                {/* EMI Table */}
                {emiTimeline.length > 0 && (
                    <div className="bg-gray-800 p-4 rounded shadow overflow-y-auto h-[50vh]">
                        <h4 className="text-xl font-bold mb-4 text-emerald-400 text-center">Monthly EMI Breakdown</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-600 text-sm">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="border border-gray-600 px-4 py-2 text-center">Month</th>
                                        <th className="border border-gray-600 px-4 py-2 text-center">EMI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emiTimeline.map((row, index) => (
                                        <tr key={index} className="even:bg-gray-800 odd:bg-gray-700">
                                            <td className="border border-gray-600 px-4 py-1 text-center">{row.month}</td>
                                            <td className="border border-gray-600 px-4 py-1 text-center">
                                                {currencySymbols[currency]}{row.emi}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Download Button */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={downloadExcelSheet}
                        disabled={!sheetData || !emiTimeline.length}
                        className={`bg-emerald-500 text-black font-semibold px-6 py-3 rounded shadow hover:bg-emerald-400 transition-colors ${!sheetData || !emiTimeline.length ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        Download {selectedLoan} Sheet (.xlsx)
                    </button>
                </div>
            </div>
        </section>
    );
}
