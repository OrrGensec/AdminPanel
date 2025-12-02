import Link from "next/link";

const tableData = [
  {
    id: "#1001",
    title: "HExploring the cosmos",
    date: "2024-07-26",
    author: "Ethan Carter",
    status: "Published",
  },
  {
    id: "#1001",
    title: "The Art Of Coding",
    date: "2024-07-26",
    author: "Olivia Bennet",
    status: "Draft",
  },
  {
    id: "#1001",
    title: "Sustainable living tips",
    date: "2024-07-26",
    author: "Noah Thompson",
    status: "Published",
  },
  {
    id: "#1001",
    title: "Digital marketing trends",
    date: "2024-07-26",
    author: "Ava Harper",
    status: "Published",
  },
  {
    id: "#1001",
    title: "Photography essentials",
    date: "2024-07-26",
    author: "Liam Foster",
    status: "Draft",
  },
];
function page() {
  return (
    <div>
      <div className="min-h-screen text-white relative overflow-hidden star">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 p-4 md:p-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col gap-6 md:gap-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white">Posts</h1>
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 md:gap-3">
              <button className="text-white bg-white/20 p-2 md:p-3 rounded-xl text-sm md:text-base">
                Create Post
              </button>
              <Link href="content-management/new">
                <button className="text-white bg-primary p-2 md:p-3 rounded-xl text-sm md:text-base w-full xs:w-auto">
                  Upload Media
                </button>
              </Link>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">All Posts</h2>
            <div className="overflow-x-auto border border-[#0ec277] rounded-2xl">
              <table className="w-full min-w-[640px]">
                <thead className="border-b border-[#0ec277]">
                  <tr>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm">Title</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm">Status</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden sm:table-cell">Author</th>
                    <th className="text-left p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {tableData.map((row, index) => (
                    <tr key={index} className="border-b border-[#0ec277]">
                      <td className="py-3 px-2 md:py-4 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-white font-medium text-xs md:text-sm truncate max-w-[150px] md:max-w-none">
                            {row.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:py-4 md:px-4">
                        <div className="bg-primary text-white w-fit px-2 py-1 md:px-3 md:py-2 rounded-lg">
                          <span className="text-white/70 text-xs md:text-sm">{row.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:py-4 md:px-4 text-primary hidden sm:table-cell">
                        <span className="text-xs md:text-sm">{row.author}</span>
                      </td>
                      <td className="py-3 px-2 md:py-4 md:px-4 text-primary hidden md:table-cell">
                        <span className="px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm font-medium">
                          {row.date}
                        </span>
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
  );
}

export default page;
