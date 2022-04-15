import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../lib/prisma";

const protectedHandler = nextConnect<NextApiRequest, NextApiResponse>();

export default protectedHandler.put(async function (req, res, next) {
  try {
    const session = await getSession({ req });
    const { email } = session?.user!;
    const item_id = req.body.item_id;

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
          const itemId = userPlaidItems?.plaidItems[i].itemId;
          if (itemId === item_id) {
            const db_id = userPlaidItems?.plaidItems[i].id;

            const deletePlaidItem = await prisma.plaidItem.delete({
              where: {
                id: db_id,
              },
            });

            return res
              .status(200)
              .json({ message: "Account successfully removed" });
          }
        }
      } else {
        return res.status(404).json({ message: "No Plaid Items" });
      }
    } else {
      return res.status(404).json({ message: "No session" });
    }
  } catch (error) {
    return res.json(error);
  }
});
