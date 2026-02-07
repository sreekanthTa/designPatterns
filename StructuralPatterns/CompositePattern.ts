// Composite Interface:  It defines the common interface for both leaf and composite objects.
//   In this case, we have an ItemInterface that has a getPrice() method.

// Leaf:  It represents the leaf objects in the composition. A leaf has no children. 
// In this case, we have an Item class that implements the ItemInterface and represents a single item with a price.

// Composite:  It represents the composite objects in the composition. 
// A composite can have children, which can be either leaf or composite objects. 
// In this case, we have a Box class that implements the ItemInterface and can contain multiple items (both leaf and composite).


interface ItemInterface {
    getPrice(): number
}


class Item implements ItemInterface {
    private price: number
    constructor(price: number){
        this.price = price
    }

    getPrice(): number{
        return this.price
    }
}


class Box implements ItemInterface{
    private items: ItemInterface[] = []

    addItem(item: ItemInterface){
        this.items.push(item)
    }

    getPrice(): number{
        let totalPrice = 0
        for(let item of this.items){
            totalPrice += item.getPrice()
        }
        return totalPrice
    }

}


const item1 = new Item(10)
const item2 = new Item(20)

const box1 = new Box()
box1.addItem(item1)
box1.addItem(item2)

const box2 = new Box()
box2.addItem(box1)
box2.addItem(new Item(30))

console.log(JSON.stringify(box2)) // 30
