class Account {
  username: string
  private transactions: Transaction[]

  constructor(username: string) {
    this.username = username
    this.transactions = []
  }

  get balance(): number {
    return this.transactions.reduce((total, transaction) => total + transaction.value, 0)
  }

  get transactionHistory(): Transaction[] {
    return [...this.transactions]
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction)
  }
}

abstract class Transaction {
  account: Account
  amount: number

  constructor(account: Account, amount: number) {
    this.account = account
    this.amount = amount
  }

  abstract get value(): number

  abstract isAllowed(): boolean

  commit(): boolean {
    if (!this.isAllowed()) {
      return false
    }

    this.account.addTransaction(this)
    return true
  }
}

class Deposit extends Transaction {
  get value(): number {
    return this.amount
  }

  isAllowed(): boolean {
    return this.amount > 0
  }
}

class Withdrawal extends Transaction {
  get value(): number {
    return -this.amount
  }

  isAllowed(): boolean {
    return this.amount > 0 && this.amount <= this.account.balance
  }
}

///////////////////////////////////////////////////////////////////

const myAccount = new Account("snow-patrol")

const t1 = new Deposit(myAccount, 500)
t1.commit()
console.log("Transaction 1:", t1)

const t2 = new Withdrawal(myAccount, 100)
t2.commit()
console.log("Transaction 2:", t2)

const t3 = new Deposit(myAccount, 100)
t3.commit()
console.log("Transaction 3:", t3)

const deniedWithdrawal = new Withdrawal(myAccount, 1000)
const wasDeniedWithdrawalCommitted = deniedWithdrawal.commit()
console.log("Is withdrawal success?:", wasDeniedWithdrawalCommitted)

console.log("Balance:", myAccount.balance)
console.log("Transaction history:", myAccount.transactionHistory)

export {}
