import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { Products, CountryCode } from "plaid";

import { client } from "../../../lib/plaid";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

export default handler.post(async (req, res) => {
  // Get the client_user_id by searching for the current user
  //   const user = await User.find(...);
  //   const clientUserId = user.id;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "1",
    },
    client_name: "Plaid Test App",
    products: [Products.Auth],
    language: "en",
    // webhook: "https://webhook.example.com",
    // redirect_uri: "https://domainname.com/oauth-page.html",
    country_codes: [CountryCode.Us],
  };

  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    res.json(createTokenResponse.data);
  } catch (error) {
    // handle error
    console.log(error);
  }
});
