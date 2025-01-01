// "use client";
// import React from "react";
// import Image from "next/image";
// import { SignOutButton, SignedIn } from "@clerk/nextjs";
// export const SignOutbutton = () => {
//   return (
//     <div>
//       <SignedIn>
//         <SignOutButton redirectUrl="/sign-in">
//           <div className="flex gap-4 cursor-pointer">
//             <Image
//               src="/assets/logout.svg"
//               alt="logout"
//               width={24}
//               height={24}
//             />
//             <span className=" text-white  max-lg:hidden">تسجيل الخروج</span>
//           </div>
//         </SignOutButton>
//       </SignedIn>
//     </div>
//   );
// };
"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const SignOutbutton = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/sign-in" }); // Redirect to the sign-in page after signing out
  };

  return (
    <div>
      {/* Optionally, check if the user is signed in */}
      <div onClick={handleSignOut} className="flex gap-4 cursor-pointer">
        <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
        <span className="text-white max-lg:hidden">تسجيل الخروج</span>
      </div>
    </div>
  );
};
