class Channel_ {
    constructor(){ this.subscribers = [] }
    subscribe(user){ this.subscribers.push(user) }
    publish(msg){
        console.log("\nChannel published:", msg)
        //  Channel handles notification logic itself, What if
        //  tomarrow new notification type you want to add, like
        //  Whatsup, we need to change or add logic here...
        //  If notifications keeps on increasing, code keep on 
        //  gets increasing
        this.subscribers.forEach(user => {
            if(user.type === "email"){
                console.log("Email sent to", user.name, ":", msg)}
            else if(user.type === "sms"){
                console.log("SMS sent to", user.name, ":", msg)}
            else if(user.type === "app"){
                console.log("App notification to", user.name, ":", msg)}
        })
    }
}

const ch_ = new Channel_()

ch_.subscribe({name: "Alice", type: "email"})
ch_.subscribe({name: "Bob", type: "sms"})
ch_.subscribe({name: "Charlie", type: "app"})
ch_.publish("New video uploaded!")

// Here Channel is doing too much work, 
// it is handling the notification logic as well, 
// which is not good,  we can use Observer pattern to fix this issue,
// where channel will only trigger the notification and 
// different observer types will handle the notification logic, 
// which is more flexible and maintainable


// With Observer Pattern
class Channel {
    constructor(){
        this.subscribers = []
    }
    subscribe(user){ this.subscribers.push(user) }
    publish(msg){
        console.log("\nChannel published:", msg)
        //Channel only triggers notification
        this.subscribers.forEach(user => user.notify(msg))
    }}
// Different observer types
class EmailUser {
    constructor(name){ this.name = name }
    notify(msg){ console.log("Email sent to", this.name, ":", msg) }
}
class SmsUser {
    constructor(name){ this.name = name }
    notify(msg){ console.log("SMS sent to", this.name, ":", msg) }
}
class AppUser {
    constructor(name){ this.name = name }
    notify(msg){ console.log("App notification to", this.name, ":", msg) }
}
// Usage
const ch = new Channel()

ch.subscribe(new EmailUser("Alice"))
ch.subscribe(new SmsUser("Bob"))
ch.subscribe(new AppUser("Charlie"))
ch.publish("New video uploaded!")
// Here Channel is only responsible for triggering the notification,
// and different observer are responsible for handling the notification logic,
// Which is more flexible and maintainable, if tomarrow new notification 
// type you want to add, like Whatsup, you can simply create new observer 
// class and implement the logic there, without changing the existing code





// Without Strategy Pattern
class Payment{
    //Here we are using if-else to handle different payment methods, 
    // which is not good, If we want to add new payment method, we 
    // need to change the existing code, which is not good and also 
    // the logic for each payment method is mixed together, which is not good
    pay(amount, method){
        if(method=="card"){
            console.log("Handle Card logic with an amount of ", amount, "and type is ", method)
        }else if(method=="paypal"){
            console.log("Handle Paypal logic with an amount of ", amount, "and type is ", method)
        }else if(method=="upi"){
            console.log("Handle Card logic with an amount of ", amount, "and type is ", method)
        }

    }
}

const p = new Payment()
p.pay(100,"upi")




// With Strategy Pattern
class CardPayment{
    pay(amount){
        console.log("Handle Card logic with an amount of ", amount)
    }
}

class PaypalPayment{
    pay(amount){
        console.log("Handle Paypal logic with an amount of ", amount)
    }
}

class UpiPayment{
    pay(amount){
        console.log("Handle Upi logic with an amount of ", amount)
    }
}

// Here we have created separate classes for each payment method, which is more 
// maintainable and flexible, If we want to add new payment method, we can simply 
// create new class and implement the logic there, without changing the existing code, 
// and the logic for each payment method is separated, which is more clear and easy to understand
class Payment_{
    constructor(strategy){
        this.strategy = strategy
    }

    pay(amount){
        this.strategy.pay(amount)
    }
}

const payment1 = new Payment_(new UpiPayment())
payment1.pay(100)





// Without Command Pattern

class Light {
    on(){console.log("Light is ON")}
    of(){console.log("Light is OF")}
}

// Here, Remote is directly controlling the Light, which is not good, 
// if we want to add new device like Fan, we need to change the existing code, 
// which is not good and also the logic for each device is mixed together,
//  which is not good and also Remote is doing too much work, it is controlling 
// the device as well as handling the logic for each device, which is not good
class Remote{
    press(button, light){
        if(button=="ON"){
            light.on()
        }else if(button=="OFF"){
            light.of()
        }
    }
}

const light = new Light()
const remote = new Remote()

remote.press("ON", light)



// With Command Pattern
class Light_{
    on(){console.log("Light is ON")}
    of(){console.log("Light is OF")}
}
//Turn Commands into Objects
class LightOnCommand{
   constructor(light){
    this.light = light
   }
   execute(){
    this.light.on()
   }}

class LightOffCommand{
   constructor(light){
    this.light = light
   }
   execute(){
    this.light.of()
   }}
// Here we have created separate command classes for each action, which is more maintainable 
// and flexible, If we want to add new action, we can simply create new command class and 
// implement the logic there, without changing the existing code, and the logic for each 
// action is separated, which is more clear and easy to understand
class Remote_{
     press(command){
        command.execute()
    }}

const light_ = new Light_()
const onCommand = new LightOnCommand(light_)
const ofCommand = new LightOffCommand(light_)
const remote_ = new Remote_()
remote_.press(onCommand)







//Without State Pattern
class Player{
    constructor(){
        this.status = "START"
    }

    press(){
        // Here we are using if-else to handle different states, which is not good,
        // If we want to add new state , we need to change the existing code, which is not good
        // Also, the logic for each state is mixed together, which is not good
        if(this.status == "START"){
            console.log("Started")
            this.status="PLAYING"
        }else if(this.status=="PLAYING"){
            console.log("Playing")
            this.status="STILLPLAY"
        }
    }
}

const player1 = new Player()
player1.press()
player1.press()
player1.press()




//With State Pattern
class StartState{
    press(player){
        console.log("Started")
        player.setState(new PlayState())
    }}
class PlayState{
    press(player){
        console.log("Playing")
        player.setState(new StillPlayState())
    }}
class StillPlayState{
    press(player){
        console.log("Still Playing")
        player.setState(new StartState())
    }}
// Here we have created separate classes for each state, which is more maintainable 
// and flexible, If we want to add new state, we can simply create new class and 
// implement the logic there, without changing the existing code, and the logic 
// for each state is separated, which is more clear and easy to understand
class Player_{
    constructor(){
        this.state = new StartState()
    }
    setState(state){
        this.state = state
    }
    press(){
        this.state.press(this)
    }
}
const player_1 = new Player_()
player_1.press()
player_1.press()
player_1.press()




// without ChainOf Responsibility
function approve(amount){
    // Using if-else to handle different approval amounts is not ideal.
    // Adding a new amount requires modifying existing code.
    // All approval logic is mixed in one place.
    // The approve() function is doing too much work and violates single responsibility.

    if(amount==100){
        console.log("Amount Sent 100")
    }else if(amount==200){
        console.log("Amount Sent 200")
    }else if(amount==300){
        console.log("Amount Sent 300")
    }
}







// with ChainOfResponsibility
 class amountAbstract{
    setNextHandler(next){this.nextHandler = next}
    handleAmount(amount){
        console.log("Amount is processed", amount)
    }}
 // Here we have created separate handler classes for each amount, which is more maintainable
 // and flexible, If we want to add new amount, we can simply create new handler class and
 // implement the logic there, without changing the existing code, and the logic for each amount
 // is separated, which is more clear and easy to understand, and the amount processing logic is
 // handled by the respective handler class, which is more cohesive and follows single 
 // responsibility principle
 class Level100 extends amountAbstract{
    handleAmount(amount){
        if(amount == 100){ console.log("Amount Level100 is processed", amount) }
        else{ this.nextHandler.handleAmount(amount) }}}
  class Level200 extends amountAbstract{
    handleAmount(amount){
        if(amount == 200){ console.log("Amount Level200 is processed", amount) }
        else{ this.nextHandler.handleAmount(amount) }}}
class Level300 extends amountAbstract{
    handleAmount(amount){
        if(amount == 300){ console.log("Amount Level300 is processed", amount) }
        else{ this.nextHandler.handleAmount(amount) }}}

 const level_100 = new Level100()
 const level_200 = new Level200()
 const level_300 = new Level300()

 level_100.setNextHandler(level_200)
 level_200.setNextHandler(level_300)

 level_100.handleAmount(100)
 level_100.handleAmount(200)
 level_100.handleAmount(300)



 // Without Template Pattern
 class Tea{
    boilWater(){
        console.log("Boiling Water")
    }
    pourWater(){
        console.log("Pouring Water")
    }
    mixWithTeaPowder(){
        console.log("Mixing Tea with Tea Powder")
    }}
 class Coffee{
    boilWater(){
        console.log("Boiling Water")
    }
    pourWater(){
        console.log("Pouring Water")
    }
    mixWithCoffeePowder(){
        console.log("Mixing Coffee with Coffee Powder")
    }}
 // Here we have repeated code for boiling water and pouring water in both Tea and 
 // Coffee classes, which is not good, if we want to change the logic for boiling 
 // water or pouring water, we need to change in both classes, which is not good 
 // and also the logic for boiling water and pouring water is mixed together with 
 // the logic for mixing tea powder and coffee powder, which is not good

 const prepare_tea = new Tea()
 prepare_tea.boilWater() // repeated code in tea and coffee
 prepare_tea.pourWater() // repeated code in tea and coffee
 prepare_tea.mixWithTeaPowder()

 const prepare_coffee = new Coffee()
 prepare_coffee.boilWater() // repeated code in tea and coffee
 prepare_coffee.pourWater() // repeated code in tea and coffee
 prepare_coffee.mixWithCoffeePowder()



  // With Template Pattern
 class BasePrepare{
    boilWater(){
        console.log("Boiling Water")
    }
    pourWater(){
        console.log("Pouring Water")
    }}

 //Here, we have created a base class BasePrepare which has the common logic 
 // for boiling water and pouring water, and then we have created separate 
 // classes for Tea and Coffee which extends the BasePrepare class and 
 // implements the specific logic for mixing tea powder and coffee powder, 
 // which is more maintainable and flexible, If we want to change the logic 
 // for boiling water or pouring water, we can simply change in the BasePrepare 
 // class, without changing in both Tea and Coffee classes, which is not good 
 // and also the logic for boiling water and pouring water is separated
 //  from the logic for mixing tea powder and coffee powder, Which is maintainable
 class Tea_ extends BasePrepare{
    mixWithTeaPowder(){
        console.log("Mixing Tea with Tea Powder")
    }}
 class Coffee_ extends BasePrepare{
    mixWithCoffeePowder(){
        console.log("Mixing Coffee with Coffee Powder")
    }}

 const prepare_tea_ = new Tea_()
 prepare_tea_.boilWater() // extended from the base class
 prepare_tea_.pourWater() // extended from the base class
 prepare_tea_.mixWithTeaPowder()

 const prepare_coffee_ = new Coffee_()
 prepare_coffee_.boilWater() // extended from the base class
 prepare_coffee_.pourWater() // extended from the base class
 prepare_coffee_.mixWithCoffeePowder()





 // Without Iterator Pattern
 class FruitsList{
    constructor(){
        this.fruits = []
    }

    add(item){
      this.fruits.push(item)
    } 
 }

const fruits_obj = new FruitsList()
fruits_obj.add("apple")
fruits_obj.add("banana")
fruits_obj.add("custord")

//Here, we are using for loop to iterate through the fruits list, which is not good,
// if we want to change the logic for iterating through the fruits list, we need to 
// change in the for loop, which is not good and also the logic for 
// iterating through the fruits list is mixed together with the logic 
// for adding fruits to the list, which is not good

for(let i=0;i<fruits_obj.fruits.length;i++){
    console.log(fruits_obj.fruits[i])
}



// With Iterator Pattern
class IteratorHelper{
    constructor(arr){
        this.arr = arr
        this.index = 0
    }
    next(){ return this.arr[this.index++] }
    hasNext(){ return this.index < this.arr.length }
}
class FruitsList_{
    constructor(){
        this.fruits = []
    }
    add(item){ this.fruits.push(item) }
    createIterator(){
        // Here we have created a separate IteratorHelper class which is responsible 
        // for iterating through the fruits list, which is more maintainable and flexible, 
        // If we want to change the logic for iterating through the fruits list, 
        // we can simply change in the IteratorHelper class, without changing in the 
        // FruitsList_ class, which is not good and also the logic for 
        // iterating through the fruits list is separated from the logic for adding 
        // fruits to the list, Which is maintainable
        return new IteratorHelper(this.fruits)
    }
}

const fruits_obj_ = new FruitsList_()
fruits_obj_.add("apple")
fruits_obj_.add("grapes")
fruits_obj_.add("custord")

const iterator = fruits_obj_.createIterator()

while(iterator.hasNext()){
    console.log(iterator.next())
}




// Without Mediator Pattern
class User{
    constructor(name){
        this.name = name
    }

    send(msg, user){
        console.log(this.name, "to ", user.name, ":", msg)
    }
}

// Here, User class is directly sending message to another user, which is not good,
// if we want to add new functionality like group chat, we need to change the existing code, 
// which is not good and also the logic for sending message is mixed together with the logic 
// for handling the users, which is not good

const user1 =  new User("first User")
const user2 =  new User("second User")

user1.send("Hello", user2)




//With Mediator Pattern
class ChatRoom{
    showMessasge(msg, user){
        console.log("message from " + user.name + ":", msg)
    }
}

class User_{
    constructor(name){
        this.name = name
        this.chat_room = new ChatRoom()
    }

    sendMessage(msg, user){
        // Here, User_ class is sending message to another user through the 
        // ChatRoom mediator, which is more maintainable and flexible, 
        // If we want to add new functionality like group chat, we can simply 
        // change in the ChatRoom class, without changing in the User_ class, 
        // which is not good and also the logic for sending message is separated 
        // from the logic for handling the users, Which is maintainable
       this.chat_room.showMessasge(msg, user)
    }

}

const first_user_ = new User_("firstUser")
const second_user_ = new User_("secondUser")

first_user_.sendMessage("Hello", second_user_)






// Without Memento
class Editor{
    constructor(){
        this.txt = ""
    }

    type(t){
        this.txt+=t
    }
}
// Here, Editor class is directly handling the text and there is no 
// way to save the state of the text, which is not good, if we want to 
// add new functionality like undo, we need to change the existing code, 
// which is not good and also the logic for handling the text is 
// mixed together with the logic for saving the state, which is not good

const editor = new Editor()
editor.type("Hello ")
editor.type("World")

 

// With Memonto

// Here we have created a separate HistoryHandler class which is responsible 
// for saving the state of the text, which is more maintainable and flexible, 
// If we want to add new functionality like undo, we can simply change in the 
// HistoryHandler class, without changing in the Editor class, which is not 
// good and also the logic for handling the text
class HistoryHandler{
    constructor(){
        this.arr = []
    }
    save(item){ this.arr.push(item) }
    undo(){ return this.arr.pop() }
}
class Editor_{
    constructor(){
        this.txt = ""
        this.history = new HistoryHandler() 
    }
    type(t){ this.txt += t }
    save(){ this.history.save(this.txt) }
    undo(){
        const prev = this.history.undo()
        if(prev !== undefined){
            this.txt = prev
        }
    }
}

const editor_ = new Editor_()
editor_.type("Hello ")
editor_.save()
editor_.type("World")
console.log(editor_.txt)   // Hello World
editor_.undo()
console.log(editor_.txt)   // Hello






// Without Visitor Pattern
class Book{
    constructor(title, author, price){
        this.title = title
        this.author = author
        this.price = price
    }
    getPrice(){ return this.price }}
class Fruit{
    constructor(name, price){
        this.name = name
        this.price = price
    }
    getPrice(){ return this.price }}

const book1 = new Book("Book 1", "Author 1", 100)
const fruit1 = new Fruit("Fruit 1", 50)
const items = [book1, fruit1]

items.forEach(item => {
    if(item instanceof Book){
        console.log("Book:", item.title, "Price:", item.getPrice())
    }else if(item instanceof Fruit){
        console.log("Fruit:", item.name, "Price:", item.getPrice())
    }
})

// Here if we add new functionality like discount,
// we need to change the existing code, which is not good and 
// also the logic for handling the book and fruit is mixed together,
// which is not good, we can use Visitor pattern to fix this issue,
// where we can create separate visitor class for handling the logic for book and fruit, 
// which is more maintainable and flexible, If we want to add new functionality like discount, 
// we can simply create new visitor class and implement the logic there, without changing the existing code, 
// and the logic for handling the book and fruit is separated, which is more clear and easy to understand

// With Visitor Pattern
class Book_{
    constructor(title, author, price){
        this.title = title
        this.author = author
        this.price = price
    }
    getPrice(){ return this.price }
    accept(visitor){ visitor.visitBook(this) }}

class Fruit_{
    constructor(name, price){
        this.name = name
        this.price = price
    }
    getPrice(){ return this.price }
    accept(visitor){ visitor.visitFruit(this) }
}

class Visitor{
    visitBook(book){ console.log("Book:", book.title, "Price:", book.getPrice()) }
    visitFruit(fruit){ console.log("Fruit:", fruit.name, "Price:", fruit.getPrice()) }
}

const book_1 = new Book_("Book 1", "Author 1", 100)
const fruit_1 = new Fruit_("Fruit 1", 50)
const items_ = [book_1, fruit_1]
const visitor = new Visitor()
items_.forEach(item => item.accept(visitor))

// Here if we add new functionality like discount, 
// we can create new visitor class and implement the logic there, 
// without changing the existing code

// Tommarow if want to add new functionality like discount,
// we can create new visitor class and implement the logic there,
// without changing the existing code

class DiscountVisitor{
    visitBook(book){
        const discountedPrice = book.getPrice() * 0.9
        console.log("Book:", book.title, "Discounted Price:", discountedPrice)
    }

    visitFruit(fruit){
        const discountedPrice = fruit.getPrice() * 0.8
        console.log("Fruit:", fruit.name, "Discounted Price:", discountedPrice)
    }
}


const discountVisitor = new DiscountVisitor()

items_.forEach(item => item.accept(discountVisitor))





//Without Interpreter Pattern
function evaluate(expression){
    const [num1, operator, num2] = expression.split(" ")
    const a = parseInt(num1)
    const b = parseInt(num2)

    // Here, we are using if-else to handle different operators, which is not good,
    // If we want to add new operator, we need to change the existing code, 
    // which is not good and also the logic for handling the operators is 
    // mixed together, which is not good and also the evaluate() function 
    // is doing too much work, it is handling the logic for all the operators, 
    // which is not good and violates single responsibility principle
    if(operator == "+"){
        return a + b
    }else if(operator == "-"){
        return a - b
    }else if(operator == "*"){
        return a * b
    }else if(operator == "/"){
        return a / b
    }
}

console.log(evaluate("3 + 4"))
console.log(evaluate("10 - 5"))
console.log(evaluate("6 * 7"))
console.log(evaluate("20 / 4"))

// Here if we want to add new operator like power, 
// we need to change the existing code, which is not good


// With Interpreter Pattern
class Expression{
    interpret(){ throw new Error("Method not implemented") }}
class NumberExpression extends Expression{
    constructor(value){ super(); this.value = value}
    interpret(){ return this.value }}
class AddExpression extends Expression{
    constructor(left, right){ super(); this.left = left; this.right = right }
    interpret(){ return this.left.interpret() + this.right.interpret() }
}
class SubtractExpression extends Expression{
    constructor(left, right){ super(); this.left = left; this.right = right }
    interpret(){ return this.left.interpret() - this.right.interpret() } 
}
class MultiplyExpression extends Expression{
    constructor(left, right){ super(); this.left = left; this.right = right }
    interpret(){ return this.left.interpret() * this.right.interpret() }
}
class DivideExpression extends Expression{
    constructor(left, right){ super(); this.left = left; this.right = right }
    interpret(){ return this.left.interpret() / this.right.interpret() }
}

// Usage
const expression1 = new AddExpression(new NumberExpression(3), new NumberExpression(4))
console.log(expression1.interpret()) // 7

const expression2 = new SubtractExpression(new NumberExpression(10), new NumberExpression(5))
console.log(expression2.interpret()) // 5

const expression3 = new MultiplyExpression(new NumberExpression(6), new NumberExpression(7))
console.log(expression3.interpret()) // 42

const expression4 = new DivideExpression(new NumberExpression(20), new NumberExpression(4))
console.log(expression4.interpret()) // 5