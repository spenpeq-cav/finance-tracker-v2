import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface Props {
  content: undefined;
  accountsData: any[];
}

export default function NetWorth(props: Props) {
  const [networth, setNetworth] = useState<number>(0.0);
  const [totalAssests, setTotalAssest] = useState<number>(0.0);
  const [totalLiabilites, setTotalLiabilites] = useState<number>(0.0);
  const [totalCash, setTotalCash] = useState<number>(0.0);
  const [totalInvestments, setTotalInvestments] = useState<number>(0.0);
  const [totalHome, setTotalHome] = useState<number>(0.0);
  const [totalCredit, setTotalCredit] = useState<number>(0.0);
  const [totalLoans, setTotalLoans] = useState<number>(0.0);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  useEffect(() => {
    var data = props.accountsData;
    const assetTypes = ["depository", "investment"];
    const liaTypes = ["credit", "loan"];
    var totalA = 0.0;
    var totalL = 0.0;
    var cash = 0.0;
    var investments = 0.0;
    var credit = 0.0;
    var loans = 0.0;
    var home = 0.0;

    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].accounts.length; j++) {
          if (data[i].accounts[j].type === assetTypes[0]) {
            totalA += data[i].accounts[j].balances.current;
            cash += data[i].accounts[j].balances.current;
          } else if (data[i].accounts[j].type === assetTypes[1]) {
            totalA += data[i].accounts[j].balances.current;
            investments += data[i].accounts[j].balances.current;
          } else if (data[i].accounts[j].type === liaTypes[0]) {
            totalL += data[i].accounts[j].balances.current;
            credit += data[i].accounts[j].balances.current;
          } else if (data[i].accounts[j].type === liaTypes[1]) {
            totalL += data[i].accounts[j].balances.current;
            loans += data[i].accounts[j].balances.current;
          }
        }
      }
      home = 1550000.45;
      setDataLoading(false);
    }
    setTotalAssest(totalA + home);
    setTotalLiabilites(totalL);
    setNetworth(totalA - totalL + home);
    setTotalCash(cash);
    setTotalInvestments(investments);
    setTotalHome(home);
    setTotalCredit(credit);
    setTotalLoans(loans);
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
          Your total accross {props.accountsData.length} institutions
        </p>
        <h1 className="text-slate-100 font-extrabold text-5xl tracking-wider p-4 border-lime-600 border-2 rounded-2xl">
          <span className={dataLoading ? "hidden" : ""}>
            ${" "}
            {networth.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>

          <PulseLoader
            color={"#d9f99d"}
            loading={dataLoading}
            css={""}
            size={25}
            margin={6}
            speedMultiplier={1}
          />
        </h1>
      </div>
      <div className="border-2 border-lime-300 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          <span className={dataLoading ? "hidden" : ""}>
            ${" "}
            {totalAssests.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>

          <PulseLoader
            color={"#d9f99d"}
            loading={dataLoading}
            css={""}
            size={15}
            margin={6}
            speedMultiplier={1}
          />
        </h1>
        <h2 className="text-3xl pb-4 text-semibold text-slate-800">Assets</h2>
        <div className="grid grid-cols-2">
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>Cash</p>
            <p>Investments</p>
            <p>House</p>
          </div>
          <div className="text-lg pb-4 text-semibold text-slate-700 tracking-wider">
            <p>
              ${" "}
              {totalCash.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              ${" "}
              {totalInvestments.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
            <p>${" "}
              {totalHome.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}</p>
          </div>
        </div>
      </div>
      <div className="border-2 border-red-400 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          <span className={dataLoading ? "hidden" : ""}>
            ${" "}
            {totalLiabilites.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>

          <PulseLoader
            color={"#d9f99d"}
            loading={dataLoading}
            css={""}
            size={15}
            margin={6}
            speedMultiplier={1}
          />
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
            <p>
              ${" "}
              {totalCredit.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              ${" "}
              {totalLoans.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
