import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dummyTransactions, Transaction } from '../../utils/dummyTransactions';

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: dummyTransactions,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
