// move car with traffic light input 

// class TrafficLight {
//     constructor(){
//      this.color = "red"
//     }

//     move() {
//       if (this.color == "red") {
//         console.log("Stop and wait")
//         this.color="green"
//       } else if (this.color == "green") {
//         console.log("Move the vehicle")
//         this.color="orange"
//       } else if (this.color == "orange") {
//         console.log("Get Ready to move the vehicle")
//         this.color="orange"
//       }
//     }
// }

// const traffic = new TrafficLight()

// traffic.move()
// traffic.move()
// traffic.move()

 class RedLight{
    move(state){
        console.log("Stop and Wait")
        state.setState(new GreenLight())
    }
 }

// class GreenLight{
//     move(state){
//         console.log("Move the vehicle")
//         state.setState(new OrangeLight())
//     }
//  }

// class OrangeLight{  
//     move(state){
//         console.log("Get Ready to move the vehicle")
//         state.setState(new RedLight())
//     }
//  }

// class TrafficLight{
//     constructor(){
//         this.color = new RedLight()
//     }

//     setState(state){
//         this.color = state
//     }

//     move(){
//         this.color.move(this)
//     }
// }

// const traffic = new TrafficLight()

// traffic.move()
// traffic.move()
// traffic.move()  


// With Singleton Pattern
class User {
  static instance = null;

  static getInstance() {
    if (!User.instance) {
      // Create instance only once
      User.instance = new User();
    }
    return User.instance;
  }
}

// Here we are using getInstance method 
// to get the instance of User class,
// Since we are creating only one instance of User class,
// user1 and user2 will point to the same instance in memory,
// which is more efficient and we have only one instance
// of User class throughout the application. 
// const user1 = User.getInstance();
// const user2 = User.getInstance();

// console.log(user1 === user2); // true


// Without Singleton Pattern
// class User_ {
//   constructor(name) {
//     this.name = name;
//   }
// }

// new user_1 instance created
// const user1_ = new User_("Alice");
// // new user_2 instance created
// const user2_ = new User_("Bob");

//Since we are creating new instances 
// of User_ class, user1_ and user2_ are different objects in memory,
// even though they have same properties, they are not the same instance.
// console.log(user1_ === user2_); // false



//With Factory Pattern

// class Car {}

// class Bike {}

// Factory class to create instances of Car and Bike
// This class holds responsility of object creation
// Maintains a single point of object creation
// class VehicleFactory {
//   getVehicle(type) {
//     if (type === "car") {
//       return new Car();
//     } else if (type === "bike") {
//       return new Bike();
//     } else {
//       throw new Error("Unknown vehicle type");
//     }
//   }
// }

// const factory = new VehicleFactory();

// const car = factory.getVehicle("car");
// console.log(car instanceof Car); // true

// const bike = factory.getVehicle("bike");
// console.log(bike instanceof Bike); // true


//Without Factory Pattern
// class Car {}
// class Bike {}

// Here if want to create multiple 
// instances of Car and Bike
// in different files, leads to 
// code duplication and maintenance issues.

// //File1.js
// const car1 = new Car();
// const bike1 = new Bike();

// // File2.js
// const car2 = new Car();
// const bike2 = new Bike();

// //File3.js
// const car3 = new Car();
// const bike3 = new Bike();






// Without Builder Pattern
// class Person {
//     // constructor with multiple parameters can be confusing
//     //(here params only 3, but can be more in real scenarios)
//   constructor(name, age, email) {
//     this.name = name;
//     this.age = age ?? 25; // default value
//     this.email = email;
//   }
// }

// // Order matters and can be confusing
// const person1 = new Person("Alice", 30, "alice@gmail.com");

// // Passing null to use default age
// const person2 = new Person("Bob", null, "bob@gmail.com");






// // With Builder Pattern
// class Person_{
//     constructor(personBuilder){
//         this.name = builder.name
//         this.age = builder.age || 25 // default value
//         this.email = builder.email
//     }
// }


// // With Builder Pattern
// class Person {
//   constructor(builder) {
//     this.name = builder.name;
//     this.age = builder.age;
//     this.email = builder.email;
//   }
// }

// // Builder class to construct Person objects
// class PersonBuilder {
//   setName(name) {this.name = name;return this;}
// // Here we can add validation for age if needed 
//   setAge(age) {this.age = age; return this;}
//   setEmail(email) {this.email = email;return this;}

//   build() {
//     return new Person(this);
//   }
// }

// const person = new PersonBuilder()
//  //Here are we are using methods to assign values,
//  // order of method does not matter and 
//  // we can skip any method, logic for default values
//  // can be handled in the Builder class, 
//  // which makes it more flexible and maintainable
//   .setName("Alice")
//   .setAge(30)
//   .setEmail("alice@gmail.com")
//   .build();

 



// // Without Prototype Pattern
// class Aeroplane {
//   constructor(model, speed, color) {
//     this.model = model;
//     this.speed = speed;
//     this.color = color
//   }
// }

// // Creating multiple instances of Aeroplane with same properties
// // new object
// const plane1_ = new Aeroplane("Boeing 600", 900, "white");

// //new object
// const plane2_ = new Aeroplane("Boeing 700", 900, "white");

// // new object
// const plane3 = new Aeroplane("Boeing 747", 900, "white");

// Here you can see, 2nd and 3rd parameters are same for all 3 instances,
// When we want to change the those 2nd and 3rd parameters, 
// we need to change in all 3 instances, 
// which is not efficient and can lead to maintenance issues.




// // With Prototype Pattern
// class Aeroplane_ {
//   constructor(model, speed, color) {
//     this.model = model;
//     this.speed = speed;
//     this.color = color
//   }

//   clone() {
//     return new Aeroplane_(this.model, this.speed, this.color);
//   }
// }

// //Since, we need to create multiple instance of Aeroplane 
// // with same speed and color, Create Prototype and 
// // clone it later and modify only the unique property (model) 
// // for each instance, which is more efficient and maintainable.
// const protoType = new Aeroplane_("Boeing 600", 900, "white");

// // Cloning the prototype to create new instances with  same speed and color,
// const plane1 = protoType.clone();
// plane1.model = "Boeing 700"; // Modifying only the model property

// // Cloning the prototype again to create another instance with same speed and color,
// const plane2 = protoType.clone();
// plane2.model = "Boeing 747"; // Modifying only the model property

// Common properties are stored in one protoType object.
// We clone it and modify only unique values.



// Without Abstract Factory Pattern
// class KfcBurger {
//     prepare(){
//         console.log("Preparing KFC Burger")
//     }
// }

// class KfcDrink {
//     prepare(){
//         console.log("Preparing KFC Drink")
//     }
// }

// class McDonaldsBurger {
//     prepare(){
//         console.log("Preparing McDonald's Burger")
//     }
// }

// class McDonaldsDrink {
//     prepare(){
//         console.log("Preparing McDonald's Drink")
//     }
// }

//Here we have Kfc has burger and drink, McDonalds has burger and drink,
// If we want to create a meal for Kfc and McDonalds, we need to create separate
// instances for each, which can lead to code duplication and maintenance issues.
// const kfcBurger = new KfcBurger();
// const kfcDrink = new KfcDrink();
// const mcDonaldsBurger = new McDonaldsBurger();
// const mcDonaldsDrink = new McDonaldsDrink();









// With Abstract Factory Pattern

// class KfcBurger {prepare(){console.log("Preparing KFC Burger")}}
// class KfcDrink { prepare(){ console.log("Preparing KFC Drink") } }
// class McDonaldsBurger { prepare(){ console.log("Preparing McDonald's Burger") } }
// class McDonaldsDrink { prepare(){ console.log("Preparing McDonald's Drink") } }

// class KfcFactory {
//     createBurger(){
//         return new KfcBurger()
//     }
//     createDrink(){
//         return new KfcDrink()
//     }
// }
// class McDonaldsFactory {
//     createBurger(){
//         return new McDonaldsBurger()
//     }
//     createDrink(){
//         return new McDonaldsDrink()
//     }
// }

// Here we have separate factory classes for Kfc and McDonalds, 
// which encapsulates the creation logic for their respective products.
// This way we can create a meal for Kfc and McDonalds without 
// code duplication and maintenance issues.

// const kfcFactory = new KfcFactory();
// const mcDonaldsFactory = new McDonaldsFactory();

// const kfcBurger1 = kfcFactory.createBurger();
// const kfcDrink1 = kfcFactory.createDrink();
// const mcDonaldsBurger1 = mcDonaldsFactory.createBurger();
// const mcDonaldsDrink1 = mcDonaldsFactory.createDrink();




//Without Adapter Pattern

// Right now we are using Stripe to send emails
// Stripe only provides sendStripeEmail()
class StripePackage{
    sendStripeEmail(){
        console.log("Stripe is sending email")
    }
}

// OurService directly depends on Stripe
class OurService{
    constructor(emailService){
        // store the external service
        this.emailService = emailService
    }

    sendMail(){
        // Directly calling Stripe specific method
        // This is the problem, If we want to convert this 
        // into another method we need to change already
        // teseted code here
        this.emailService.sendStripeEmail()
    }
}

// Usage
const stripe = new StripePackage()
const ourService1 = new OurService(stripe)
ourService1.sendMail()

// Output:
// Stripe is sending email




// With Adapter Pattern

// Here stripe, we might change Stripe to Paypal in future
class StripePackage{
    //Suppose stripe has only  sendStripeEmail
    sendStripeEmail(){ console.log("Stripe is sending email") }
}

// EmailAdapter is a Middle man between
// OurService  <---Email Adapter--->  Stripe(Third Party)
// If we change Stripe to Paypal later,
// We only change the adapter, not OurService
class EmailAdapter{
    constructor(emailService){
        // Store the real service (Stripe or Paypal)
        this.emailService = emailService
    }
    // Common method that OurService understands
    send(){
        // If service is Stripe
         this.emailService.sendStripeEmail()
    }
}
class OurService{
    constructor(adapter){ this.adapter = adapter }  // Store adapter
    sendMail(){ this.adapter.send() } // Always call adapter's send()
}

// Using Stripe
const stripe = new StripePackage() //Here if we change to Paypal still works
const stripeAdapter = new EmailAdapter(stripe)
const service1 = new OurService(stripeAdapter)
service1.sendMail()




//Without Bridge Pattern
//Suppose if we want implement functionality of notificionts
// and alerts, we might use services either email service or
// sms service....

// Medium => email, message
// Type => notification,alert

class EmailNotification{
    send(){ console.log("Sending Email Notification")}
}
class EmailAlert{
    send(){console.log("Sending Email Alert")}
}

class MessageNotification{
    send(){console.log("Sending Message Notification")}
}
class MessageAlert{
    send(){console.log("Sending Message Alert")}
}

//Issue what if we want to add another type of medium,
// Like maybe whatsup...
// we need to create two classes again...

class WhatsupNotification{
    send(){console.log("Sending Whatsup Notificaton")}
}
class WhatsupAlert{
    send(){console.log("Sending Whatsup Alert")}
}

// Here you can see classes are increasing, if want to add whatsup
// What if we want to add 3 types, and 3 mediums => 9 classes
// Reustls in 3 * 3 = 9
// It results in increasing classes


//With Bridge Pattern
class Email{
    send(){console.log("Sending Email")}
}

class Sms{
    send(){console.log("Sending Sms")}
}


class Notification{
    constructor(service){this.service=service}
    send(){ console.log("Sending Notification") this.service.send() }
}

class Alert extends Notification{
    send(){ console.log("sending Alert"); this.service.send() }
}

//Usage via like bridge here
//Email with notification
const email1 =  new Email()
const notification_1 = new Notification(email1)
notification_1.send()

//Email with Alert
const email1 =  new Email()
const alert_1 = new Alert(email1)
alert_1.send()

//Now we have clases for type=> Notification + Alert
//And also we have services => email + message + whatsup(if we add)
//total we have 2 + 3 = 5








// Without Composite pattern

//Add fruits into basket and ask every fruit
// or basket to show it items

class Apple{
    show(){ console.log("I am an apple") }
}

class Banana{
    show(){ console.log("I am a banana") }
}

class Basket{
    constructor(){
        this.arr = []
    }
    add(item){ this.arr.push(item) }
    show(){
          this.arr.forEach(item => {
            // must check what type it is
            if(item instanceof Apple){
                item.show()
            }
            else if(item instanceof Banana){
                item.show()
            }
            else if(item instanceof Basket){
                item.show()
            }

        })
    }
}

//If we want to add another fruit, we might need to
// add else if again for that fruit


// With Composite Pattern

class Apple{
    show(){ console.log("I am an apple") }
}
class Banana{
    show(){ console.log("I am a banana") }
}
class Basket{
    constructor(){
        this.arr=[]
    }
    add(item){ this.arr.push(item) }
    show(){ this.arr.forEach((e)=>e.show()) }
}

const apple1 = new Apple()
apple1.show()
const apple2 = new Apple()
apple2.show()
const banana1 = new Banana()
banana1.show()
const basket1 = new Basket()
const basket2 = new Basket()
console.log("basket1--------------")
basket1.add(apple1)
basket1.add(apple2)
basket1.add(banana1)
basket1.show()
console.log("basket2-------------")
basket2.add(apple1)
basket2.add(basket1)
basket2.show()






//Without Decorator Pattern
class Coffee(){
    cost(){return 10}
}

class CoffeeWithExtraMilk(){
    cost(){return 15}
}

class CoffeeWithExtraSugar(){
    cost(){return 12}
}

class CoffeeWithExtraMilkAndSugar(){
    cost(){return 17}
}

// Here suppose we only have Coffe(), later we might
//Extend thsee combinations further, there we might
// need to add code here again ...




// With Decorator Pattern

//Base Coffee
class Coffee(){
    cost(){return 10}
}

// Milk Decorator
class Milk(){
    constructor(coffee){
        this.coffee = coffee
    }
    cost(){
        return this.coffee.cost() + 5
    }
}

//Sugar Decorator
class Sugar(){
    constructor(coffee){
        this.coffee = coffee
    }
    cost(){
        return this.coffee.cost() + 5
    }
}


let coffee = new Coffee()
coffee = new Milk(coffee)
coffee = new Sugar(coffee)

// 10 (coffee)
// +5 (milk)
// +2 (sugar)





// Without Facade Pattern

class TV{
    on(){console.log("TV ON")}
}

class Sound{
    on(){console.log("Sound ON")}
}

class Player {
    play(){ console.log("Movie playing") }
} 


//Here, we need to remember the order,
// And also it is hard to maintain, if we want to 
// play  movie in different files
const tv = new TV()
const sound = new Sound()
const player = new Player()

tv.on()
sound.on()
player.play()




// With Facade Pattern
class TV_{
    on(){console.log("TV ON")}
}

class Sound_{
    on(){console.log("Sound ON")}
}

class Player_ {
    play(){ console.log("Movie playing") }
} 


class TVFacadePattern{
    constructor(){
        this.tv = new TV_()
        this.sound = new Sound_()
        this.player = new Player_()
    }

    watchMovie(){
        this.tv.on()
        this.sound.on()
        this.player.play()
    }
}


//Here we have one object
const theater = new HomeTheaterFacade()
// Here we have one method to watch movie
// Easy to maintain
theater.watchMovie()





// WITHOUT Proxy Pattern
// Client talks directly to the Database

class Database {

    query(){
        console.log("Running DB query...")
    }
}

// Client directly creates database object
const db = new Database()

// Client runs query immediately
// Problem: No control before executing query
// - No permission check
// - No logging
// - No caching
// - No security layer
db.query()




// With Proxy Pattern


class Database_ {
    query(){
        console.log("Running DB query...")
    }
}

class DatabaseProxy {
    constructor(){
        this.db = new Database_()
    }
    query(){
        console.log("Checking permission...")
        // imagine security check here
        this.db.query()
    }
}

class DatabaseProxy {
    constructor(){
        this.db = new Database()
    }
    query(){
        console.log("Checking permission...")
        // imagine security check here
        this.db.query()
    }
}

const db = new DatabaseProxy()
db.query()




// WITHOUT Flyweight
class Tree{

    constructor(type, color, x, y){
        this.type = type      // duplicated 10k times 
        this.color = color    // duplicated 10k times 
        this.x = x            // unique 
        this.y = y            // unique 
    }
}

const forest = []

for(let i=0;i<10000;i++){
    forest.push(new Tree("pine","green", i, i+5))
}

// With Flyweight

// Flyweight object (shared data)
// This stores common properties that many trees share
class TreeType{

    constructor(type,color){
        this.type = type
        this.color = color
    }
}

// Create ONE shared object only once
// All trees will reuse this instead of creating new ones
const pineType = new TreeType("pine","green")

// Context object (unique data per tree)
class Tree{

    constructor(x,y,type){
        this.x = x          // unique position
        this.y = y          // unique position

        // store reference to shared TreeType object
        // NOT creating a new type/color each time
        this.type = type
    }
}

const forest=[]

// Create 10,000 trees
for(let i=0;i<10000;i++){

    // IMPORTANT:
    // Every tree uses the SAME pineType object
    // Memory is saved because type/color are not duplicated
    forest.push(new Tree(i,i,pineType))
}





// Behaviour Design Patterns


//Observer Pattern

class Channel{

    constructor(){
        // Store Subscribers
        this.subscribers = []
    }

    publish(msg){
        this.subscribers.forEach((e) => e.notify(msg))
    }
}

class User{

    constructor(name){
        this.name = name
    }

    notify(msg){
        console.log("Notifying user message is as ", msg)
    }
}


