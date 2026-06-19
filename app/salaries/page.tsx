// import * as React from "react";
// import { db } from "@/lib/db";
// import { SalaryTable } from "@/components/features/SalaryTable";

// // Coerce layout options forcing runtime environment to evaluate fresh entries dynamically
// export const revalidate = 0;

// export default async function SalariesRootPage() {
//   // Server Component directly queries database context securely without standard hydration API roundtrips
//   const compensationEntries = await db.salary.findMany({
//     where: { isVerified: true },
//     include: {
//       company: {
//         select: {
//           name: true,
//           logoUrl: true,
//           slug: true // 👈 ADD THIS FIELD HERE TO MAP THE COLORS
//         }
//       }
//     },
//     orderBy: {
//       submittedAt: "desc"
//     }
//   });

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//           Verified Technical Compensation Logs
//         </h1>
//         <p className="text-sm text-slate-500">
//           Real-time market analytics pulled straight from verified pipeline datasets and platform submissions.
//         </p>
//       </div>

//       {/* Output fully computed presentation structure directly down data stream pipe */}
//       <SalaryTable salaries={compensationEntries} />
//     </div>
//   );
// }
import * as React from "react";
import { db } from "@/lib/db";
import { SalaryTable } from "@/components/features/SalaryTable";

// Coerce layout options forcing runtime environment to evaluate fresh entries dynamically
export const revalidate = 0;

export default async function SalariesRootPage() {
  // Server Component directly queries database context securely without standard hydration API roundtrips
  const compensationEntries = await db.salary.findMany({
    where: { isVerified: true },
    include: {
      company: {
        select: {
          name: true,
          logoUrl: true,
          slug: true 
        }
      }
    },
    orderBy: {
      submittedAt: "desc"
    }
  });

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F7F7F7] px-4 py-12 flex flex-col items-center selection:bg-[#FF5A5F] selection:text-white relative">
      
      {/* Container holding both the header block and the table data */}
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        
        {/* Header Block styled with our 3D theme layout */}
        <div className="bg-white border-2 border-[#222222] rounded-2xl p-6 shadow-[5px_5px_0px_#222222] relative">
          {/* Micro Accent Badge */}
          <div className="absolute -top-3 left-6 border-2 border-[#222222] bg-[#FF5A5F] text-white px-3 py-0.5 text-xs font-black rounded-lg shadow-[2px_2px_0px_#222222] tracking-wider uppercase">
            📈 Live Market Analytics
          </div>
          
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight">
              Verified Technical Compensation Logs
            </h1>
            <p className="text-sm text-[#484848] mt-1 font-medium">
              Real-time market analytics pulled straight from verified pipeline datasets and platform submissions.
            </p>
          </div>
        </div>

        {/* Outer 3D card wrapping the Table to elevate its depth presence */}
        <div className="bg-white border-2 border-[#222222] rounded-2xl p-6 shadow-[6px_6px_0px_#222222]">
          {/* Output fully computed presentation structure directly down data stream pipe */}
          <SalaryTable salaries={compensationEntries} />
        </div>

      </div>
    </div>
  );
}