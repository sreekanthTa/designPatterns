class TV{
    on(){
        console.log("TV is ON");
    }
    off(){
        console.log("TV is OFF");
    }
}

class RemoteControl{
    private tv: TV

    constructor(tv: TV){
        this.tv = tv
    }

    turnOn(){
        this.tv.on()
    }

    turnOff(){
        this.tv.off()
    }
}

const tv = new TV()
const remote = new RemoteControl(tv)

remote.turnOn()
remote.turnOff()

// what is the issue with this code?
// if we want to add new device like AC, we need to change the RemoteControl class, which is not good for open closed principle

// SOL: command pattern

interface Command{
    execute(): void
}

class TVOnCommand implements Command{
    private tv: TV

    constructor(tv: TV){
        this.tv = tv
    }

    execute(): void {
        this.tv.on()
    }
}

class TVOffCommand implements Command{
    private tv: TV
    
    constructor(tv: TV){
        this.tv = tv
    }

    execute(): void {
        this.tv.off()
    }
}

class RemoteControlWithCommand{
    private onCommand: Command
    private offCommand: Command

    constructor(onCommand: Command, offCommand: Command){
        this.onCommand = onCommand
        this.offCommand = offCommand
    }

    turnOn(){
        this.onCommand.execute()
    }

    turnOff(){
        this.offCommand.execute()
    }
}

const tv2 = new TV()
const tvOnCommand = new TVOnCommand(tv2)
const tvOffCommand = new TVOffCommand(tv2)

const remoteWithCommand = new RemoteControlWithCommand(tvOnCommand, tvOffCommand)

remoteWithCommand.turnOn()
remoteWithCommand.turnOff()

// now if we want to add new device like AC, we can create new command classes for AC   
// and use them without changing the RemoteControlWithCommand class, which is good for open closed principle 
