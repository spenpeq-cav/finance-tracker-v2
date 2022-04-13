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
      const plaidItemsCount = await prisma.user.findUnique({
        where: {
          email: email!,
        },
        select: {
          _count: {
            select: { plaidItems: true },
          },
        },
      });

      const plaidItemsCountLength = plaidItemsCount?._count.plaidItems;

      if (plaidItemsCountLength! > 0) {
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
          return res.status(200).json(accountsArray);
        } else {
          return res.status(404).json({ message: "No Plaid Items" });
        }
      } else {
        return res.status(404).json({ message: "No plaid items" });
      }
    }
    
  } catch (error) {
    return res.json(error);
  }
});
