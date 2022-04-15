import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const RemoveAccount = () => {
  const [removeActive, setRemoveActive] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [accountsData, setAccountsData] = useState<any[]>([]);
  const [totalInst, setTotalInst] = useState<number>(0);
  const [message, setMessage] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const toggleRemoveActive = () => {
    setRemoveActive(!removeActive);
  };

  const handleRemove = async (e: any) => {
    e.preventDefault();
    const item_id = e.currentTarget.value;
    const key_id = e.currentTarget.id;
    const removeResponse = await fetch("/api/remove_account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: item_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
      setTotalInst(totalInst - 1)
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/plaid/get_accounts", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setAccountsData(data);
      setTotalInst(data.length);
      setDataLoading(false);
      setMessage(null)
    };

    fetchData();
  }, [totalInst]);

  return (
    <div className="col-span-4 py-6">
      <h1 className="text-slate-200 font-bold text-4xl text-left">
        Remove an Account
      </h1>
      <p className="text-slate-400 text-xl text-left">
        Remove one of your accounts
      </p>
      <div className="col-span-4 py-6 text-left">
        <button
          onClick={toggleRemoveActive}
          className={
            removeActive
              ? "btn btn-remove py-4 px-12 opacity-50"
              : "btn btn-remove py-4 px-12"
          }
        >
          Remove Account
        </button>
        <div className={removeActive ? "" : "invisible"}>
          <p className="text-rose-500 text-xl font-semibold py-4">
            Select account to remove
          </p>

          <BeatLoader
            color={"#a3e635"}
            loading={dataLoading}
            css={""}
            size={25}
            margin={12}
            speedMultiplier={1}
          />

          {accountsData &&
            accountsData.map((acc, index) => (
              <button
                key={index}
                className="border-2 border-rose-600 rounded-lg bg-rose-200 w-1/2 col-span-4 text-center m-2 hover:bg-rose-400 duration-200 ease-in-out"
                value={acc.item.item_id}
                id={String(index)}
                onClick={handleRemove}
              >
                <h1 className="text-xl py-2 font-bold text-slate-900">
                  {acc.item.institution_id}
                </h1>
              </button>
            ))}
          <p className="text-red-500 col-span-4">
            {message !== null && message}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RemoveAccount;
