import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET_SANDBOX = process.env.PLAID_SECRET_SANDBOX;
const PLAID_SECRET_DEV = process.env.PLAID_SECRET_DEV;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET_SANDBOX,
      "Plaid-Version": "2020-09-14",
    },
  },
});
export const client = new PlaidApi(configuration);
