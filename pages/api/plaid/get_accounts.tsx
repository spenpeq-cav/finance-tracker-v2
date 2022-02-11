import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const client = new PlaidApi(configuration);

const protectedHandler = nextConnect<NextApiRequest, NextApiResponse>();

export default protectedHandler.get(async function (req, res, next) {
  try {
    const session = await getSession({ req });
    const { email } = session?.user!;
    var accountsArray = [];

    if (session) {
      const userPlaidItems = await prisma.user.findUnique({
        where: {
          email: email!,
        },
        select: {
          plaidItems: true,
        },
      });
      if (userPlaidItems !== null) {
        for (var i = 0; i < userPlaidItems!.plaidItems.length; i++) {
          const accessToken = userPlaidItems?.plaidItems[i].accessToken;
          const accountsResponse = await client.accountsGet({
            access_token: accessToken!,
          });
          accountsArray.push(accountsResponse.data);
        }
        // console.log(accountsArray);
        res.status(200).json(accountsArray);
      } else {
        res.status(404).json({ message: "No Plaid Items" });
      }
    }
    res.status(404).json({ message: "No session" });
  } catch (error) {
    return res.json(error);
  }
});
