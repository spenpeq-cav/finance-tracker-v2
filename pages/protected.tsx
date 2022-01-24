import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();

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
  if (typeof window !== "undefined" && loading) return <><h1 className="text-white">LOADING....</h1></>;

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
    <>
      <h1 className="text-white">Protected Page</h1>
      <p className="text-white">
        <strong>{content || "\u00a0"}</strong>
      </p>
    </>
  );
}
