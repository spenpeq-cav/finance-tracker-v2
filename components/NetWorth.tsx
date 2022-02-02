interface Props {
  content: undefined;
  accountData: any[];
}

export default function NetWorth(props: Props) {
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
          Your total accross X accounts
        </p>
        <h1 className="text-slate-100 font-extrabold text-5xl tracking-wider p-4 border-lime-600 border-2 rounded-2xl">
          $ 213,764.95
        </h1>
      </div>
      <div className="border-2 border-lime-600 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          $ 159,245.38
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
      <div className="border-2 border-lime-600 rounded-lg bg-slate-400 p-4 w-full col-span-2 text-left px-8">
        <h1 className="text-4xl py-4 font-bold text-slate-900 tracking-wider">
          $ 79,359.38
        </h1>
        <h2 className="text-3xl pb-4 text-semibold text-slate-800">Liabilities</h2>
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
      <div className="border-2 border-lime-600 rounded-lg bg-slate-400 p-4 w-full col-span-2">
        <p className="text-lime-600 text-5xl">$ 75,000</p>
        <p className="text-rose-600 text-5xl">- 30,000</p>
        <hr className="text-slate-200 my-2" />
        <p className="text-lime-400 font-extrabold text-6xl">$ 30,000</p>
      </div>
      <div className="border-2 border-lime-600 rounded-lg bg-slate-400 col-span-2">
        <p className="text-slate-200">
          <strong>{props.content || "\u00a0"}</strong>
        </p>
      </div>
      <div className="text-slate-200 border-2 border-lime-600 rounded-lg bg-slate-400 col-span-2">
        {props.accountData &&
          props.accountData.map((acc) => (
            <p key={acc.account_id}>
              {acc.name} | {acc.balances.current}
            </p>
          ))}
      </div>
    </>
  );
}
