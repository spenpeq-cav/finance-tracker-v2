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

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

    var mm_prev_month = "";
    if (mm === "01") {
      mm_prev_month = "12";
    } else {
      mm_prev_month = String(today.getMonth()).padStart(2, "0");
    }

    const yyyy = today.getFullYear();

    const todayString = yyyy + "-" + mm + "-" + dd;
    const startDate = yyyy + "-" + mm_prev_month + "-" + dd;

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

        const accessToken = userPlaidItems?.plaidItems[0].accessToken;

        const request: TransactionsGetRequest = {
          access_token: accessToken!,
          start_date: startDate,
          end_date: todayString,
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
              start_date: startDate,
              end_date: todayString,
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
          return res.status(200).json(transactions);
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.status(400).json({ message: "No plaid items" });
      }
    }
    return res.status(404).json({ message: "No session" });
  } catch (error) {
    console.log(error);
  }
  
});
