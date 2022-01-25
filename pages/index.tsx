import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {prisma} from "../lib/prisma";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <Head>
        <title>Finance Tracker</title>
        <meta name="description" content="Track finances with Plaid API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-5xl font-bold text-cyan-500 py-4">
          Finance Tracker
        </h1>
        <p className="text-lg font-semibold text-cyan-500">
          View all your accounts in one place, utilizing Plaid.
        </p>

        {loading && (
          <>
            <h1 className="p-4 text-sky-100">LOADING ...</h1>
          </>
        )}
        {!session && (
          <div>
            <span className="p-4 text-sky-100">You are not signed in.</span>
            <a
              href={`/api/auth/signin`}
              className="border border-white p-4 text-sky-100"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </div>
        )}
        {session?.user && (
          <>
            <span className="p-4 text-sky-100 relative">
              Signed in as <strong>{session.user.email}</strong>
              <br />
              <strong>{session.user.name}</strong>
              <br />
              <Image
                src={session.user.image!}
                alt="Profile image"
                layout="fill"
              />
            </span>
            <a
              href={`/api/auth/signout`}
              className="border border-white p-4 text-sky-100"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
        <Link href="/protected">
          <a className="border border-white p-4 text-sky-100">Protected</a>
        </Link>
      </main>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const users = await prisma.user.findMany();
//   return {
//     props: { users },
//   };
// };

export default Home;
