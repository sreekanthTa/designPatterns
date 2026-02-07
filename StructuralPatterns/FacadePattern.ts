// Facade Pattern: A facade is a design pattern that provides a simplified interface to a complex subsystem.
// It hides the complexities of the subsystem and provides a simple interface to the client.

// In this example, we have a complex subsystem that consists of multiple classes that work together to perform a task.
// The Facade class provides a simple interface to the client, allowing them to interact with 
// the subsystem without having to understand its complexities.

// Without Facade Pattern:

 class CPU {
    start(){
        console.log("CPU started")
    }
 }

 class Memory {
    load(){
        console.log("Memory loaded")
    }
    }

  class HardDrive {
    read(){
        console.log("Hard Drive read")
    }
 }

const cpu = new CPU();
const memory = new Memory();
const disk = new HardDrive();

cpu.start();
memory.load();
disk.read();


// Problems:

// Client must know everything

// Wrong order = bug

// Hard to use

// Hard to change


// What is the issue with this code?
// The client code is tightly coupled to the complex subsystem, and it has to know about the operations of the subsystem to perform the task, which is not good for maintainability and readability.

// SOL: Facade Pattern
 
class ComputerFacade {
    private cpu: CPU;
    private memory: Memory;
    private hardDrive: HardDrive;

    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    startComputer() {
        this.cpu.start();
        this.memory.load();
        this.hardDrive.read();
    }
}

// Usage
const computer = new ComputerFacade();
computer.startComputer(); 
// Client code is now decoupled from the complex subsystem, and it can simply call the startComputer method to perform the task, which is good for maintainability and readability.