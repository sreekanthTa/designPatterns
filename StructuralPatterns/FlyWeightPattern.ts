// FlyWeight Pattern: The Flyweight pattern is a structural design pattern that allows you to share common data among multiple objects to reduce memory usage. It is particularly useful when you have a large number of similar objects that share some common state.
// In this example, we have a FlyweightFactory that manages the creation and sharing of flyweight objects.

// Flyweight Interface: It defines the common interface for flyweight objects. In this case, we have a Shape interface that has a draw() method.

// Concrete Flyweight: It represents the concrete flyweight objects that share common state. In this case, we have a Circle class that implements the Shape interface and represents a circle with a specific color.

// Flyweight Factory: It is responsible for creating and managing flyweight objects. It ensures that flyweight objects are shared properly and provides a way to get existing flyweight objects or create new ones if they don't exist.

class Tree {
    constructor(color: string, x: number, y:number) {}

}

const tree1 = new Tree("Green", 10, 20)
const tree2 = new Tree("Green", 15, 25)
const tree3 = new Tree("Brown", 20, 30)

// Problem: Here, tree1 and tree2 have the same color "Green", 
// but they are two different objects in memory, which is not memory efficient if they are more.

// SOL: Flyweight Pattern
class TreeType {
    constructor(public color: string) {}
}

class Tree_ {
    constructor(public x: number, public y: number, public type: TreeType) {}

    draw() {
        console.log(`Tree of color ${this.type.color} at (${this.x}, ${this.y})`);
    }
}

class TreeFactory {
    private static trees: { [key: string]: TreeType } = {};

    static getTree(color: string): TreeType {
        if (!this.trees[color]) {
            this.trees[color] = new TreeType(color);
        }
        return this.trees[color];
    }
}

// Create trees using Flyweight
const tree_1 = new Tree_(10, 20, TreeFactory.getTree("Green"));
const tree_2 = new Tree_(30, 40, TreeFactory.getTree("Green")); // shares same TreeType
const tree_3 = new Tree_(50, 60, TreeFactory.getTree("Brown"));


tree_1.draw(); // Tree of color Green at (10, 20)
tree_2.draw(); // Tree of color Green at (30, 40)
tree_3.draw(); // Tree of color Brown at (50, 60)

// What is the issue with this code?
// Here, tree_1 and tree_2 are the same object in memory, which is memory efficient if there are more trees with the same color.