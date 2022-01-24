import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <>
      <h1 className="text-white">Access Denied</h1>
      <p className="text-white py-10">
        <a
          href="/api/auth/signin"
          className="text-white p-4 border border-white"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  );
}
