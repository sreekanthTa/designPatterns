class WithoutStrategy{
    constructor(){}

    pay(method: string, amount: number){

        if(method=="creditcard"){
            console.log("Processing credit card payment", amount)
        }else if(method=="debitcard"){
            console.log("Processing  debitcard payment", amount)

        }else if(method=="paypal"){
            console.log("Processing paypal payment", amount)
        }

    }
}

const with_out_strategy = new WithoutStrategy()
with_out_strategy.pay("creditcard", 100)
with_out_strategy.pay("debitcard", 200)
with_out_strategy.pay("paypal", 300)

//Problem: if we want to add new payment method, we need to change the pay method, which is not good for open closed principle

// SOL: strategy pattern

interface PaymentStrategy{
    pay(amount: number): void
}

class CreditCardPayment implements PaymentStrategy{
    pay(amount: number): void {
        console.log("Processing credit card payment", amount)
    }
}

class DebitCardPayment implements PaymentStrategy{
    pay(amount: number): void {
        console.log("Processing debit card payment", amount)
    }
}

class PaypalPayment implements PaymentStrategy{
    pay(amount: number): void {
        console.log("Processing paypal payment", amount)
    }
}

class WithStrategy{
    private strategy: PaymentStrategy

    constructor(strategy: PaymentStrategy){
        this.strategy = strategy
    }
    
    setStrategy(strategy: PaymentStrategy){
        this.strategy = strategy
    }

    pay(amount: number){
        this.strategy.pay(amount)
    }
}

const with_strategy = new WithStrategy(new CreditCardPayment())
with_strategy.pay(100)

with_strategy.setStrategy(new DebitCardPayment())
with_strategy.pay(200)

with_strategy.setStrategy(new PaypalPayment())
with_strategy.pay(300)


// Observer Pattern: Bell rings → multiple subscribers (canteen, classroom, office) react differently at the same time
    //   Bell rings → canteen, classroom, office all react at the same time

// Strategy Pattern: PaymentProcessor → only one payment method chosen at a time and that method handles the payment
    // PaymentProcessor → you pick PayPal OR Card OR Crypto, only one is used

//     Both are about extensibility and avoiding changes in the main class,
// but Observer notifies many,
// while Strategy uses only one chosen behavior at a time.


// Observer Pattern (1 → Many)
//         [Subject / Channel]
//                |
//        ---------------------
//        |         |         |
//    [Observer] [Observer] [Observer]
//    (Canteen)  (Classroom)  (Office)

// - When the subject changes (bell rings / video published),
//   **ALL observers react** independently.


// Key points:

// Subject just notifies

// Observers keep their own logic

// Many can react at the same time





// Strategy Pattern (1 → 1)
//         [Context / PaymentProcessor]
//                    |
//            [Chosen Strategy]
//            (PayPal / Card / Crypto)

// - Context picks **only one strategy** at a time
// - Strategy class contains **its own logic**
// - Can switch strategy dynamically without changing context


// Key points:

// Context just calls strategy

// Only one behavior active at a time