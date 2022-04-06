import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { TransactionsGetRequest } from "plaid";

import { prisma } from "../../../lib/prisma";
import { client } from "../../../lib/plaid";

const protectedHandler = nextConnect<NextApiRequest, NextApiResponse>();

export default protectedHandler.get(async function (req, res, next) {
  try {
    const session = await getSession({ req });
    const { email } = session?.user!;

    if (session) {
      const userPlaidItems = await prisma.user.findUnique({
        where: {
          email: email!,
        },
        select: {
          plaidItems: true,
        },
      });
      const accessToken = userPlaidItems?.plaidItems[0].accessToken;
      const request: TransactionsGetRequest = {
        access_token: accessToken!,
        start_date: "2022-02-01",
        end_date: "2022-03-01",
      };
      try {
        const response = await client.transactionsGet(request);
        let transactions = response.data.transactions;
        const total_transactions = response.data.total_transactions;
        // Manipulate the offset parameter to paginate
        // transactions and retrieve all available data
        while (transactions.length < total_transactions) {
          const paginatedRequest: TransactionsGetRequest = {
            access_token: accessToken!,
            start_date: "2020-02-01",
            end_date: "2022-01-01",
            options: {
              offset: transactions.length,
            },
          };
          const paginatedResponse = await client.transactionsGet(
            paginatedRequest
          );
          transactions = transactions.concat(
            paginatedResponse.data.transactions
          );
        }
        res.status(200).json(transactions);
      } catch (err) {
        console.log(err);
      }
    }
    res.status(404).json({ message: "No session" });
  } catch (error) {
    return res.json(error);
  }
});
