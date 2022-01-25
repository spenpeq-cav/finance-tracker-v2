import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <>
      <h1 className="text-white">Access Denied</h1>
      <p className="text-white py-10">
        <Link href="/api/auth/signin">
          <a
            className="text-white p-4 border border-white"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            You must be signed in to view this page
          </a>
        </Link>
      </p>
    </>
  );
}
