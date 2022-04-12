import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <>
      <h1 className="text-5xl font-extrabold text-slate-50 py-4 mt-48">Access Denied</h1>
      <p className="text-xl font-semibold text-slate-300 pb-2">You must be signed in to view your dashboard.</p>
      <p className="text-slate-200 py-10">
        <Link href="/api/auth/signin">
          <a
            className="btn btn-primary py-6 px-16"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </a>
        </Link>
      </p>
    </>
  );
}
