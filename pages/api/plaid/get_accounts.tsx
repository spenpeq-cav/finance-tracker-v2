import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";
import { client } from "../../../lib/plaid";

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
