interface Props {
  transactionData: any[];
}

export default function RecentTransactions(props: Props) {
  return (
    <>
      <div className="col-span-4 py-6">
        <h1 className="text-slate-200 font-bold text-4xl text-left">
          Recent Transactions
        </h1>
        <p className="text-slate-400 text-xl">
          A table of your recent transactions.
        </p>
      </div>
      <div className="text-slate-900 border-4 border-lime-600 rounded-lg bg-slate-400 col-span-4 w-full">
        <table className="table-auto w-full">
          <thead className="font-bold bg-slate-400">
            <tr className="pb-4">
              <th className="px-6 py-2 text-lg text-slate-900">Date</th>
              <th className="px-6 py-2 text-lg text-slate-900">Name</th>
              <th className="px-6 py-2 text-lg text-slate-900">Category</th>
              <th className="px-6 py-2 text-lg text-slate-900">Amount</th>
            </tr>
          </thead>
          <tbody className="text-md text-semibold text-slate-800 bg-slate-200 divide-y divide-slate-600">
            {props.transactionData &&
              props.transactionData.map((trans) => (
                <tr
                  key={trans.transaction_id}
                  className="uppercase whitespace-nowrap"
                >
                  <td className="px-2 py-4 text-xl text-slate-900">
                    {trans.date}
                  </td>
                  <td className="px-2 py-4 text-xl text-slate-700">
                    {trans.name}
                  </td>
                  {trans.category.length > 1 ? (
                    <td className="px-2 py-4 text-md text-slate-700">
                      {trans.category.map((cat: string, index: number) => (
                        <div key={index}>{cat}</div>
                      ))}
                    </td>
                  ) : (
                    <td className="px-2 py-4 text-md text-slate-900">
                      {trans.category}
                    </td>
                  )}
                  <td className="px-2 py-4 text-xl text-slate-900 font-bold">
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
