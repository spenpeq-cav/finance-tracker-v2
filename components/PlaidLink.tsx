import React, { useState } from "react";
import { usePlaidLink } from "react-plaid-link";

interface LinkProps {
  linkToken: string | null;
}

const PlaidLink: React.FC<LinkProps> = (props: LinkProps) => {
  const [accessToken, setAccessToken] = useState(null);
  const [itemID, setItemID] = useState(null);
  const [message, setMessage] = useState(null);

  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch("/api/plaid/set_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    // receivedRedirectUri: window.location.href,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      <button
        onClick={() => open()}
        disabled={!ready}
        className={
          message !== null
            ? "btn btn-disabled py-4 px-12"
            : "btn btn-primary py-4 px-12"
        }
      >
        Link account
      </button>
      
      {message && (
        <p className="text-teal-300 font-bold text-2xl text-left py-4">
          {message}
        </p>
      )}
    </>
  );
};
export default PlaidLink;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const dbUser = await prisma.user.findUnique({
//     where: {
//       id: "elsa@prisma.io",
//     },
//   });
//   return { props: { dbUser } };
// };
