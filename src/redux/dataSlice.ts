import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currencies = {
  label: string;
  symbol: string;
  __typename: string;
};
interface IOnlineStoreDataState {
  currencies: Currencies[];
  currentCurrency: {
    label: string;
    symbol: string;
    __typename: string;
  } | null;
}
const initialState: IOnlineStoreDataState = {
  currencies: [],
  currentCurrency: null,
};

export const dataSlice = createSlice({
  name: "onlineStoreData",
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<Currencies[]>) => {
      return {
        ...state,
        currencies: action.payload,
        currentCurrency: action.payload[0],
      };
    },
    setCurrentCurrency: (state, action: PayloadAction<Currencies>) => {
      return {
        ...state,
        currentCurrency: action.payload,
      };
    },
  },
});

export const { setCurrencies, setCurrentCurrency } = dataSlice.actions;

export default dataSlice.reducer;
