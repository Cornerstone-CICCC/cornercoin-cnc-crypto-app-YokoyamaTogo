This assignment will allow you to practice with the newly discovered class-based OOP chops you've recently discovered.

# Exercise

# CornerCoin (CNC) Crypto App

You've been hired to work on a new crypto currency app to manage CornerCoins (aka CNC coins).

The project has already started and some code was already written.

Features:

Here's a list of features that our code needs to support:

- Allow multiple accounts to be created
- Each account can have many transactions
- Allow withdrawals and deposits into accounts
- Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
- Allow us to retrieve the current balance of the account at any time
- Don't allow withdrawals that exceed the remaining balance of the account

Okay, so there's really nothing here that has anything to do with crypto. We just wanted to make it sound more fun than traditional banking software. That's what fads are for after all. That's right, I called crypto currencies a fad.

Here's the current state of the application logic:

```js
let balance = 500.0;

class Withdrawal {
  constructor(amount) {
    this.amount = amount;
  }

  commit() {
    balance -= this.amount;
  }
}
```

> Note: Read the code prior to running it and reading further. You should feel comfortable knowing not only what it will output but also how it works.

Every account holder of this app will have a balance that they can withdraw from and deposit to. For now, the user starts with a balance of 500.00 and there is a Withdrawal object that allows a user to withdraw money from that balance.

```js
t1 = new Withdrawal(50.25);
t1.commit();
console.log("Transaction 1:", t1);

t2 = new Withdrawal(9.99);
t2.commit();
console.log("Transaction 2:", t2);

console.log("Balance:", balance);
```

To withdraw money, the application logic requires that a new instance of a Withdrawal object be created with the desired amount. The commit method should then be called in order to finalize and apply that transaction to the account's balance.

> Instruction: Run the app using `node index.js`.

You should get the following output:

```bash
Transaction 1: Withdrawal { amount: 50.25 }
Transaction 2: Withdrawal { amount: 9.99 }
Balance: 439.76
```

## Step 1: Deposit class

We have a way to withdraw money from the user's balance, but no way of depositing.

### Instruction

- Create a Deposit class to represent deposits
- Let's instantiate a deposit to test it out.

```js
// Add this code to test your Deposit class
t3 = new Deposit(120.0);
t3.commit();
console.log("Transaction 3:", t3);
```

## Step 2: Account class

So far we have an object for Withdrawal and an object for Deposit, but the user's balance is just a number variable accessible to all functions. This is bad for a few reasons:

- Associating data with the balance, like an account number or name, will be difficult.
- There is just one balance amount, so the app does not support multiple accounts.
- The variable's scope makes it accessible by any class or function in this file. Not only is this needless exposure, it could lead to a function accidentally modifying this variable.
- To fix these issues, we are going to create an Account class that will keep track of the user and their balance.

Now we can create a new account for every user of the app.

### Instructions

- Create an Account class that will have username and balance as properties.
- Add the following account creation code to the top of your driver code

```js
const myAccount = new Account("snow-patrol");
```

## Step 3: Refactor Deposit and Withdrawal classes

- Update the Withdrawal and Deposit classes to use this new account object instead of the balance variable.

- Modify your driver code to pass the correct information into the constructors

- Each time a withdrawal or deposit is created, pass it the account that is associated with the transaction.

- You'll also need to update the driver code to use the account balance instead of the old balance variable.

## Step 4: Transaction

You may have noticed that our Withdrawal and Deposit classes are starting to look very similar. So similar in fact, that when we changed from using a balance variable to an Account object, we had to make the exact same changes to both classes.

This smells a bit, doesn't it? In this case, it's the smell of code that isn't DRY. Is it a sign that we might benefit from inheritance by creating a superclass for these two transaction types?

### Instruction

- Introduce a Transaction class to share some common code between the two classes.

We are moving as much logic as makes sense into the Transaction class. We want Deposit and Withdrawal to only contain the code that it absolutely has to. The remaining code in the subclasses is logic that could not be shared with the others.

The way we create a new Withdrawal or Deposit has not changed; the interface has stayed the same. What has changed is how we're implementing these classes. Our driver code, which uses the classes, has zero need to change. This is an example of good refactoring.

## Step 5: Refactor commit

### Instructions

- Use a getter method to DRY up commit logic.

Instead of having commit defined in each subclass, define a getter method called `value` in each subclass. For deposits, the `value` getter should simply return `this.amount`. However for withdrawals, it should return the negative amount.

- Update the commit methods to use `this.value` instead of `this.amount`.

Now that value contains a positive or negative amount, we can simply add `value` instead of having to decide in the commit. It's therefore possible to now share the `commit` method by moving it into the superclass.

- Test your refactoring by writing appropriate driver code.

## Step 6: Missing Feature 1 - Keep Track of Transactions

Right now we keep updating a balance property and we're not keeping track of each transaction that modifies the balance. It would be much better if we kept track of everything so we could have a history of every transaction for each account.

- Let's modify the Account class to be able to keep track of the transactions.
- Calculate account balance by summing up the value of every transaction.

> Note: Be sure to run your code and make sure it still works!

## Step 7: Missing Feature 2 - Validate Withdrawals

There is currently nothing checking if the user has money in their account prior to allowing a withdrawal. If the user has $0 and they want to keep withdrawing from their account, there is nothing stopping them. Add some logic to make sure the user can never withdraw more money than they have.

*Tip:* One way to do this is to add a check that the transaction is allowed in the Transaction's commit method. The check should call a method like `isAllowed()` which returns true/false and would need to be implemented in each of the two subclasses. commit should return true/false based on its success. If it's not successful, the transaction should not be added into the account either.

> Note: Remember to test your code with some additional driver code that tests this validation
