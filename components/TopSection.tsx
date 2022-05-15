import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function TopSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    switch (router.pathname) {
      case "/dashboard":
        setText("Dashboard");
        break;
      case "/dashboard/accounts":
        setText("Accounts");
        break;
      case "/dashboard/settings":
        setText("Settings");
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="col-span-4 border-b-4 border-teal-700 pb-6">
      <h1 className="text-neutral-200 font-extrabold text-5xl tracking-wider">
        <span className="text-teal-400">
          {session!.user?.name?.split(" ")[0]}&rsquo;s{" "}
        </span>{" "}
        {text}
      </h1>
    </div>
  );
}

export default TopSection;
