import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  // true, false
  status: true,
  deposit: 0,
  withdraw: 0,
  payLoan: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_ACCOUNT":
      return {
        ...state,
        status: false,
      };
    case "DEPOSIT":
      const depositTotal = state.balance + action.payload;
      return {
        ...state,
        balance: depositTotal,
      };

    case "WITHDRAW":
      const totalWithdraw = state.balance - action.payload;
      return {
        ...state,
        balance: totalWithdraw < 0 ? 0 : totalWithdraw,
      };
    case "CLOSE_ACCOUNT":
      return {
        ...state,
      };
    case "LOAN_REQUEST":
      const loanTotal = state.loan + action.payload;
      return {
        ...state,
        loan: loanTotal > 5000 ? 5000 : loanTotal,
        balance: state.balance + action.payload,
      };
    case "PAY_LOAN":
      const totalPay = state.loan - action.payload;
      return {
        ...state,
        loan: totalPay < 0 ? 0 : totalPay,
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}
export default function App() {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="app">
          <h2>UseReducer Bank Account</h2>
          <p>
            <strong>Balance: {balance}</strong>
          </p>
          <p>
            <strong>Loan: {loan}</strong>
          </p>
          <button
            disabled={!status}
            onClick={() => dispatch({ type: "OPEN_ACCOUNT" })}
          >
            Open Account
          </button>
          <br></br>
          <button
            disabled={status}
            onClick={() => dispatch({ type: "DEPOSIT", payload: 150 })}
          >
            Deposit 150
          </button>
          <br></br>
          <button
            disabled={status}
            onClick={() => dispatch({ type: "WITHDRAW", payload: 50 })}
          >
            Withdraw 50
          </button>
          <br></br>
          <button
            disabled={status}
            onClick={() => dispatch({ type: "LOAN_REQUEST", payload: 5000 })}
          >
            LoanRequest of 5000
          </button>
          <br></br>
          <button
            disabled={status}
            onClick={() => dispatch({ type: "PAY_LOAN", payload: 5000 })}
          >
            PayLoan of 5000
          </button>
          <br></br>

          {balance === 0 && loan === 0 ? (
            <button
              disabled={status}
              onClick={() => dispatch({ type: "CLOSE_ACCOUNT" })}
            >
              Close Account
            </button>
          ) : null}
          <br></br>
        </div>
      </header>
    </div>
  );
}
