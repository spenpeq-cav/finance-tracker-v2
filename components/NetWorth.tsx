import { useState, useEffect } from "react";

interface Props {
  content: undefined;
  accountsData: any[];
}

export default function NetWorth(props: Props) {
  const [networth, setNetworth] = useState<number>(0.0);
  const [totalAssests, setTotalAssest] = useState<number>(0.0);
  const [totalLiabilites, setTotalLiabilites] = useState<number>(0.0);
  
  useEffect(() => {
    var data = props.accountsData;
    const assetTypes = ["depository", "investment"];
    const liaTypes = ["credit", "loan"];
    var totalA = 0.0;
    var totalL = 0.0;

    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].accounts.length; j++) {
          if (
            data[i].accounts[j].type === assetTypes[0] ||
            data[i].accounts[j].type === assetTypes[1]
          ) {
            totalA += data[i].accounts[j].balances.current;
          } else if (
            data[i].accounts[j].type === liaTypes[0] ||
            data[i].accounts[j].type === liaTypes[1]
          ) {
            totalL += data[i].accounts[j].balances.current;
          }
        }
      }
    }
    setTotalAssest(totalA);
    setTotalLiabilites(totalL);
    setNetworth(totalA - totalL);
  }, [props.accountsData]);

  return (
    <>
      <div className="col-span-4 py-6">
        <h1 className="text-slate-200 font-bold text-4xl text-left">
          Net Worth
        </h1>
        <p className="text-slate-400 text-xl">
          A summary of your assets and liabilities.
        </p>
      </div>
      <div className="col-span-4 pb-4 text-left">
        <p className="text-slate-400  text-xl uppercase pb-2">
          Your total accross {props.accountsData.length} accounts
        </p>
        <h1 className="text-slate-100 font-extrabold text-5xl tracking-wider p-4 border-lime-600 border-2 rounded-2xl">
          $ {networth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </h1>
      </div>
      <div className="border-2 border-lime-300 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          ${" "}
          {totalAssests.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </h1>
        <h2 className="text-3xl pb-4 text-semibold text-slate-800">Assets</h2>
        <div className="grid grid-cols-2">
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>Cash</p>
            <p>Investments</p>
            <p>House</p>
          </div>
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>$ 123,234.45</p>
            <p>$ 123,234.45</p>
            <p>$ 123,234.45</p>
          </div>
        </div>
      </div>
      <div className="border-2 border-red-400 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          ${" "}
          {totalLiabilites.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </h1>
        <h2 className="text-3xl pb-4 text-semibold text-slate-800">
          Liabilities
        </h2>
        <div className="grid grid-cols-2">
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>Credit Cards</p>
            <p>Loans</p>
          </div>
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>$ 1,733.93</p>
            <p>$ 23,278.35</p>
          </div>
        </div>
      </div>

      <div className="text-slate-200 border-2 border-lime-600 rounded-lg bg-slate-400 col-span-2">
        {/* {props.accountsData &&
          props.accountsData.map((acc) => (
            <p key={acc.account_id}>
              {acc.name} | {acc.balances.current}
            </p>
          ))} */}
        {props.accountsData &&
          props.accountsData.map((acc, index) => (
            <p key={index}>
              {index + 1} | {acc.request_id} | {acc.accounts.length}
            </p>
          ))}
      </div>
    </>
  );
}
