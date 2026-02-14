class Channel_ {
    constructor(){
        this.subscribers = []
    }
    subscribe(user){
        this.subscribers.push(user)
    }
    publish(msg){
        console.log("\nChannel published:", msg)
        //  Channel handles notification logic itself, What if
        //  tomarrow new notification type you want to add, like
        //  Whatsup, we need to change or add logic here...
        //  If notifications keeps on increasing, code keep on 
        //  gets increasing
        this.subscribers.forEach(user => {
            if(user.type === "email"){
                console.log("📧 Email sent to", user.name, ":", msg)
            }
            else if(user.type === "sms"){
                console.log("📱 SMS sent to", user.name, ":", msg)
            }
            else if(user.type === "app"){
                console.log("🔔 App notification to", user.name, ":", msg)
            }
        })
    }
}



class Channel {

    constructor(){
        this.subscribers = []
    }

    subscribe(user){
        this.subscribers.push(user)
    }

    publish(msg){

        console.log("\nChannel published:", msg)

        // ✅ Channel only triggers notification
        this.subscribers.forEach(user => user.notify(msg))
    }
}


// Different observer types

class EmailUser {
    constructor(name){
        this.name = name
    }

    notify(msg){
        console.log("📧 Email sent to", this.name, ":", msg)
    }
}

class SmsUser {
    constructor(name){
        this.name = name
    }

    notify(msg){
        console.log("📱 SMS sent to", this.name, ":", msg)
    }
}

class AppUser {
    constructor(name){
        this.name = name
    }

    notify(msg){
        console.log("🔔 App notification to", this.name, ":", msg)
    }
}


// Usage

const ch = new Channel()

ch.subscribe(new EmailUser("Alice"))
ch.subscribe(new SmsUser("Bob"))
ch.subscribe(new AppUser("Charlie"))

ch.publish("New video uploaded!")





// Without Strategy Pattern
class Payment{
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
   }
}

class LightOffCommand{
   constructor(light){
    this.light = light
   }
   execute(){
    this.light.of()
   }
}

class Remote_{
     press(command){
        command.execute()
    }
}

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
    }
}

class PlayState{
    press(player){
        console.log("Playing")
        player.setState(new StillPlayState())
    }
}

class StillPlayState{
    press(player){
        console.log("Still Playing")
        player.setState(new StartState())
    }
}


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
function approve(level){
    
    if(level=="low"){
        console.log("Approved by Team Lead")
    }else if(level=="medium"){
        console.log("Approved by Manager")
    }else if(level=="high"){
        console.log("Approved by Director")
    }
}

// with ChainOfResponsibility
class Approver{
    setNext(approver){
        this.nextApprover = approver
    }
    approve(level){
        if(this.nextApprover){
            this.nextApprover.approve(level)
        }else{
            console.log("No approver found for level:", level)
        }
    }
}

class Manager extends Approver{
    approve(level){
        if(level=="medium"){
            console.log("Approved by Manager")
        }else{
            super.approve(level)
        }
    }
}

class Director extends Approver{
    approve(level){
        if(level=="high"){
            console.log("Approved by Director")
        }else{
            super.approve(level)
        }
    }
}

class Ceo extends Approver{
    approve(level){
        if(level=="low"){
            console.log("Approved by CEO")
        }else{
            super.approve(level)
        }
    }
}

const ceo = new Ceo()
const manager = new Manager()
const director = new Director()

ceo.setNext(manager)
manager.setNext(director)

ceo.approve("medium")