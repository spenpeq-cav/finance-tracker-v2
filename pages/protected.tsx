import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import Link from "../components/Link";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [linkToken, setLinkToken] = useState(null);

  const getLinkToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }

  // If session exists, display content
  return (
    <div>
      <h1 className="text-white">Protected Page</h1>
      <p className="text-white">
        <strong>{content || "\u00a0"}</strong>
      </p>
      <button
        onClick={getLinkToken}
        className="text-cyan-900 border-2 p-6 border-cyan-500 mt-10 bg-slate-300"
      >
        Link Token
      </button>
      {linkToken && <p className="text-white">{linkToken}</p>}
      {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
    </div>
  );
}
