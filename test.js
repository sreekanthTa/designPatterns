class Apple{
    show(){
        console.log("I am an apple")
    }
}

class Banana{
    show(){
        console.log("I am a banana")
    }
}

class Basket{
    constructor(){
        this.arr=[]
    }
    add(item){
        this.arr.push(item)
    }

    show(){
        this.arr.forEach((e)=>e.show())
    }
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