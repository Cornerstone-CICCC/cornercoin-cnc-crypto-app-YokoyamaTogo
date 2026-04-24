"use strict";
class Account {
    username;
    transactions;
    constructor(username) {
        this.username = username;
        this.transactions = [];
    }
    get balance() {
        return this.transactions.reduce((total, transaction) => total + transaction.value, 0);
    }
    get transactionHistory() {
        return [...this.transactions];
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}
class Transaction {
    account;
    amount;
    constructor(account, amount) {
        this.account = account;
        this.amount = amount;
    }
    commit() {
        if (!this.isAllowed()) {
            return false;
        }
        this.account.addTransaction(this);
        return true;
    }
}
class Deposit extends Transaction {
    get value() {
        return this.amount;
    }
    isAllowed() {
        return this.amount > 0;
    }
}
class Withdrawal extends Transaction {
    get value() {
        return -this.amount;
    }
    isAllowed() {
        return this.amount > 0 && this.amount <= this.account.balance;
    }
}
///////////////////////////////////////////////////////////////////
const myAccount = new Account("snow-patrol");
const t1 = new Deposit(myAccount, 500);
t1.commit();
console.log("Transaction 1:", t1);
const t2 = new Withdrawal(myAccount, 100);
t2.commit();
console.log("Transaction 2:", t2);
const t3 = new Deposit(myAccount, 100);
t3.commit();
console.log("Transaction 3:", t3);
const deniedWithdrawal = new Withdrawal(myAccount, 1000);
const wasDeniedWithdrawalCommitted = deniedWithdrawal.commit();
console.log("Is withdrawal success?:", wasDeniedWithdrawalCommitted);
console.log("Balance:", myAccount.balance);
console.log("Transaction history:", myAccount.transactionHistory);
