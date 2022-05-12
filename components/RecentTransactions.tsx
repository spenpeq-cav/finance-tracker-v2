import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface Props {
  transactionData: any[];
  isLoading: boolean;
}

export default function RecentTransactions(props: Props) {
  const [sum, setSum] = useState<String>("");
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const transactionSum = () => {
      var sum = 0.0;
      for (var i = 0; i < props.transactionData.length; i++) {
        sum += props.transactionData[i].amount;
      }
      const sumString = sum.toLocaleString();
      setSum(sumString);
      setDataLoading(props.isLoading);
    };

    transactionSum();
  }, [props.transactionData, props.isLoading]);

  return (
    <>
      <div className="col-span-4 py-6">
        <h1 className="text-neutral-100 font-bold text-4xl text-left tracking-wider">
          Recent Transactions
        </h1>
        <p className="text-neutral-300 text-xl text-left py-2">
          A table of your recent transactions.
        </p>
        <h2 className="text-neutral-300 text-3xl text-left pt-4 tracking-wide">
          Total: <span className={dataLoading ? "hidden" : ""}>${sum}</span>
          <PulseLoader
            color={"#d9f99d"}
            loading={dataLoading}
            css={""}
            size={15}
            margin={4}
            speedMultiplier={1}
          />
        </h2>
      </div>
      <div className="text-neutral-900 border-2 border-teal-600 rounded-lg bg-neutral-800 col-span-4 w-full">
        <table className="table-fixed w-full">
          <thead className="font-bold bg-neutral-700 tracking-wider text-neutral-100 text-xl">
            <tr className="pb-4">
              <th className="px-6 py-2">Date</th>
              <th className="px-6 py-2">Name</th>
              <th className="px-6 py-2">Category</th>
              <th className="px-6 py-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-md text-semibold text-neutral-800 bg-neutral-800 divide-y divide-teal-600">
            {props.transactionData.length > 0 &&
              props.transactionData.map((trans) => (
                <tr
                  key={trans.transaction_id}
                  className="uppercase whitespace-nowrap"
                >
                  <td className="px-2 py-4 text-xl text-neutral-100">
                    {trans.date}
                  </td>
                  <td className="px-2 py-4 text-xl text-neutral-300">
                    {trans.name}
                  </td>
                  {trans.category.length > 1 ? (
                    <td className="px-2 py-4 text-md text-neutral-300">
                      {trans.category.map((cat: string, index: number) => (
                        <div key={index}>{cat}</div>
                      ))}
                    </td>
                  ) : (
                    <td className="px-2 py-4 text-md text-neutral-100">
                      {trans.category}
                    </td>
                  )}
                  <td className="px-2 py-4 text-xl text-neutral-100 font-bold tracking-wide">
                    {trans.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
