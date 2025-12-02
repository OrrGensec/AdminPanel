"use client";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  MoreVertical,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const tableData = [
  {
    refId: "456789366",
    transactionDate: "Sept 12, 2024, 4:30PM",
    date: "2024-07-26",
    status: "Pending",
    amount: "+5,670",
    type: "Income",
    from: "fadel@gmail.com",
  },
  {
    refId: "456789366",
    transactionDate: "Sept 12, 2024, 4:30PM",
    date: "2024-07-26",
    status: "Completed",
    amount: "+5,670",
    type: "Savings",
    from: "Wise - 5466xxx",
  },
  {
    refId: "456789366",
    transactionDate: "Sept 12, 2024, 4:30PM",
    date: "2024-07-26",
    status: "Cancelled",
    amount: "-15,670",
    type: "Expenses",
    from: "Paypal - 5466xxx",
  },
  {
    refId: "456789366",
    transactionDate: "Sept 12, 2024, 4:30PM",
    date: "2024-07-26",
    status: "Pending",
    amount: "+3,670",
    type: "Income",
    from: "fadel@gmail.com",
  },
  {
    refId: "456789366",
    transactionDate: "Sept 12, 2024, 4:30PM",
    date: "2024-07-26",
    status: "Completed",
    amount: "+35,670",
    type: "Savings",
    from: "Wise - 5466xxx",
  },
];
const navCategories = ["All", "Savings", "Income", "Expenses"];
function page() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div>
      <div className="min-h-screen text-white relative overflow-hidden star">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 p-4 md:p-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col gap-6 md:gap-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Transactions History
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-white bg-primary p-2 md:p-3 rounded-xl text-sm md:text-base text-center sm:text-left">
                Sep 9, 2024 - Oct 15, 2024
              </div>
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 md:gap-3">
                <button className="text-white bg-primary p-2 md:p-3 rounded-xl text-sm md:text-base">
                  Export CSV
                </button>
                <button className="text-white bg-primary p-2 md:p-3 rounded-xl text-sm md:text-base">
                  Download Invoices
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
                    <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-primary m-2" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-400">Balances</p>
                    <p className="font-bold text-xl md:text-3xl truncate">$78,987.00</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
                    <Wallet className="w-4 h-4 md:w-6 md:h-6 text-primary m-2" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-400">Savings</p>
                    <p className="font-bold text-xl md:text-3xl truncate">$23,000.00</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
                    <ArrowDown className="w-4 h-4 md:w-6 md:h-6 text-primary m-2" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-400">Incomes</p>
                    <p className="font-bold text-xl md:text-3xl truncate">$28,670.00</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
                    <ArrowUp className="w-4 h-4 md:w-6 md:h-6 text-primary m-2" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-400">Expenses</p>
                    <p className="font-bold text-xl md:text-3xl truncate">$3,456.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg">
              <div  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-3 gap-2">
                <div className="flex items-center overflow-x-auto">
                  {navCategories.map((category, index) => (
                    <div
                      onClick={() => setSelectedCategory(category)}
                      key={index}
                      className={`px-3 md:px-4 py-2 md:py-3 text-sm md:text-lg cursor-pointer whitespace-nowrap ${
                        selectedCategory === category
                          ? "text-primary border-b-2 border-primary font-bold"
                          : ""
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>

                <div className="text-sm md:text-lg px-3 sm:px-0">Status: All</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-primary">
                    <tr>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Ref ID</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden sm:table-cell">Transaction Date</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">From</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Type</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Amount</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Status</th>
                      <th className="text-left p-2 md:p-3 text-xs md:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    {tableData.map((row, index) => (
                      <tr key={index} className="border-b border-[#0ec277]">
                        <td className="py-3 px-2 md:py-4 md:px-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-white text-xs md:text-sm">{row.refId}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 md:py-4 md:px-4 hidden sm:table-cell">
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-white text-xs md:text-sm">
                              {row.transactionDate}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 md:py-4 md:px-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-white/20 w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base flex-shrink-0">
                              {row.from[0].toUpperCase()}
                            </div>
                            <span className="text-xs md:text-sm truncate max-w-[100px] md:max-w-none">{row.from}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 md:py-4 md:px-4 hidden md:table-cell">
                          <span className="text-white/70 text-xs md:text-sm">{row.type}</span>
                        </td>

                        <td className="py-3 px-2 md:py-4 md:px-4">
                          <span className="rounded text-xs md:text-sm">{row.amount}</span>
                        </td>
                        <td className="py-3 px-2 md:py-4 md:px-4">
                          <span
                            className={`rounded text-xs md:text-sm px-1.5 py-0.5 md:p-2 ${
                              row.status === "Completed"
                                ? "bg-green-500/20 text-green-500"
                                : row.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 md:py-4 md:px-4">
                          <div className="flex justify-end">
                            <MoreVertical size={18} className="md:w-6 md:h-6" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
