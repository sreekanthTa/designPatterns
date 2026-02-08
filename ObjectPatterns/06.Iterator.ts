class withoutIterator{
    private items: string[] = [];
    private numberOfItems: number = 0;

    addItem(item: string){
        this.items.push(item);
        this.numberOfItems++;
    }

    getItems(){
        return this.items;
    }
}

const without_iterator = new withoutIterator()
without_iterator.addItem("item1")
without_iterator.addItem("item2")

const items = without_iterator.getItems()

for(let i=0; i<items.length; i++){
    console.log(items[i])  // it breask if we change the array to object or map or tree in getItems method
}



// SOL: iterator pattern

interface Iterator<T>{
    hasNext(): boolean
    next(): T
}

class ItemIterator implements Iterator<string>{
    private items: string[]
    private position: number = 0

    constructor(items: string[]){
        this.items = items
    }

    hasNext(): boolean {
        return this.position < this.items.length
    }

    next(): string {
        return this.items[this.position++]
    }
}

class WithIterator{
    private items: string[] = [];
    private numberOfItems: number = 0;

    addItem(item: string){
        this.items.push(item);
        this.numberOfItems++;
    }

    getIterator(): Iterator<string>{
        return new ItemIterator(this.items)
    }
}

const with_iterator = new WithIterator()
with_iterator.addItem("item1")
with_iterator.addItem("item2")

const iterator = with_iterator.getIterator()
while(iterator.hasNext()){
    console.log(iterator.next())
}   



// what is the issue with this code?
// if we want to change the way we store items, we need to change the getItems method, which is not good for open closed principle

// What’s wrong here?

// Client knows internal structure (array)

// If you change storage to:

// object

// map

// tree

// 👉 ALL client code breaks