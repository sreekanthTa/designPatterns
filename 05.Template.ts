class Beverage{

    prepare(){
        this.boilWater();
        this.brew();
        this.pourInCup();
    }

    boilWater(){
        console.log("Boiling water");
    }

    brew(){
        console.log("Brewing the beverage");
        throw new Error("Method not implemented.");
    }

    pourInCup(){
        console.log("Pouring into cup");
    }
}

class Coffee extends Beverage{
    brew(){
        console.log("Brewing coffee");
    }
}

class Tea extends Beverage{
    brew(){
        console.log("Brewing tea");
    }
}

const coffee = new Coffee()
coffee.prepare()

const tea = new Tea()
tea.prepare()

// Template method pattern: defines the skeleton of an algorithm in a method, deferring some steps to subclasses. 
// Template method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
