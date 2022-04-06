import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";
import { client } from "../../../lib/plaid";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

export default handler.post(async function (req, res, next) {
  const publicToken = req.body.public_token;

  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;

    const session = await getSession({ req });
    // const { userId } = session?.user!;
    const { email } = session?.user!;

    const addPlaidItem = await prisma.plaidItem.create({
      data: {
        accessToken: accessToken,
        itemId: itemID,
        user: { connect: { email: email! } },
      },
    });
    res.status(200).json({ message: "Successfully added account!" });
  } catch (error) {
    // handle error
    console.log(error);
  }
});
