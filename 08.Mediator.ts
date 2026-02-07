//Without Mediator

class UserWithoutMediator{
    constructor(public name: string, public chatRoom: ChatRoomWithoutMediator){}

    sendMessage(message: string, toUser: UserWithoutMediator){
        this.chatRoom.sendMessage(message, this, toUser)
    }

    receiveMessage(message: string, fromUser: UserWithoutMediator){
        console.log(`${this.name} received message from ${fromUser.name}: ${message}`)
    }
}

class ChatRoomWithoutMediator{
    sendMessage(message: string, fromUser: UserWithoutMediator, toUser: UserWithoutMediator){
        toUser.receiveMessage(message, fromUser)
    }
}

const chatRoomWithoutMediator = new ChatRoomWithoutMediator()
const user1WithoutMediator = new UserWithoutMediator("Alice", chatRoomWithoutMediator)
const user2WithoutMediator = new UserWithoutMediator("Bob", chatRoomWithoutMediator)

user1WithoutMediator.sendMessage("Hello Bob!", user2WithoutMediator)
user2WithoutMediator.sendMessage("Hi Alice!", user1WithoutMediator)


// What is the issue with this code?
// if we want to add new feature like group chat, we need to change the ChatRoomWithoutMediator class, 
// which is not good for open closed principle

// Each user needs to know about other users to send messages, which is not good for loose coupling

// SOL: mediator pattern

class UserWithMediator{
    constructor(public name: string, public chatRoom: ChatRoomWithMediator){}

    sendMessage(message: string, toUser: UserWithMediator){
        this.chatRoom.sendMessage(message, this, toUser)
    }

    receiveMessage(message: string, fromUser: UserWithMediator){
        console.log(`${this.name} received message from ${fromUser.name}: ${message}`)
    }
}

class ChatRoomWithMediator{
    private users: UserWithMediator[] = []

    registerUser(user: UserWithMediator){
        this.users.push(user)
    }

    sendMessage(message: string, fromUser: UserWithMediator, toUser: UserWithMediator){
        toUser.receiveMessage(message, fromUser)
    }
}

const chatRoom = new ChatRoomWithMediator()
const user1 = new UserWithMediator("Alice", chatRoom)
const user2 = new UserWithMediator("Bob", chatRoom)

chatRoom.registerUser(user1)
chatRoom.registerUser(user2)

user1.sendMessage("Hello Bob!", user2)
user2.sendMessage("Hi Alice!", user1)

// What is the advantage of using mediator pattern here?
// 1. We can add new features like group chat without changing the existing code
// 2. Each user does not need to know about other users to send messages, which is good for loose coupling