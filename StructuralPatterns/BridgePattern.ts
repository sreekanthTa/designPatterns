//Bridge Pattern: The Bridge pattern is a structural design pattern that decouples an abstraction from its implementation, allowing the two to vary independently. It is used to separate the interface of a class from its implementation, enabling them to evolve separately without affecting each other.

// In this example, we have an abstraction called Shape, which has a reference to an implementation called Color. The Shape class defines the interface for drawing shapes, while the Color class defines the interface for coloring shapes. The Bridge pattern allows us to change the implementation of the Color class without affecting the Shape class, and vice versa.

//Without Bridge Pattern

class Circle {
    constructor(public color: string) {}

    draw() {
        console.log(`Drawing a ${this.color} circle`);
    }
}

class Square {
    constructor(public color: string) {}

    draw() {
        console.log(`Drawing a ${this.color} square`);
    }
}

const redCircle = new Circle("Red");
redCircle.draw(); // Drawing a Red circle

const blueSquare = new Square("Blue");
blueSquare.draw(); // Drawing a Blue square

// Problems:

// 1. If we want to add more shapes or colors, we need to create new classes for each combination of shape and color, which is not good for maintainability and readability.

// 2. The Shape class is tightly coupled to the Color class, which makes it difficult to change the implementation of the Color class without affecting the Shape class.

// SOL: Bridge Pattern
 
// Abstraction
abstract class shape{
    
}