//Without State Pattern

class DirectionServiceWithoutState{

    getDirectionBasedOnType(type: string){

        if(type=="car"){
            console.log("Getting directions for car")
            return  {"eta": "30 mins", "distance": "10 km"}
        }else if(type=="bike"){
            console.log("Getting directions for bike")
            return  {"eta": "20 mins", "distance": "8 km"}  
        }else if(type=="walk"){
            console.log("Getting directions for walk")
            return  {"eta": "1 hour", "distance": "5 km"}
        }

    }
}
 
const directionServiceWithoutState = new DirectionServiceWithoutState()
directionServiceWithoutState.getDirectionBasedOnType("car")
directionServiceWithoutState.getDirectionBasedOnType("bike")
directionServiceWithoutState.getDirectionBasedOnType("walk")

//What is the issue with this code?
// if we want to add new type of transportation, we need to change the getDirectionBasedOnType method, 
// which is not good for open closed principle

// SOL: state pattern

interface TransportationState{
    getDirection(): {"eta": string, "distance": string}
}

class CarState implements TransportationState{

    getDirection(): {"eta": string, "distance": string} {
        console.log("Getting directions for car")
        return  {"eta": "30 mins", "distance": "10 km"}
    }
}

class BikeState implements TransportationState{

    getDirection(): {"eta": string, "distance": string} {
        console.log("Getting directions for bike")
        return  {"eta": "20 mins", "distance": "8 km"}  
    }
}

class WalkState implements TransportationState{

    getDirection(): {"eta": string, "distance": string} {
        console.log("Getting directions for walk")
        return  {"eta": "1 hour", "distance": "5 km"}
    }
}

class DirectionServiceWithState{
    private state: TransportationState

    constructor(state: TransportationState){
        this.state = state
    }

    setState(state: TransportationState){
        this.state = state
    }

    getDirection(){
        return this.state.getDirection()
    }
}

const directionServiceWithState = new DirectionServiceWithState(new CarState())
directionServiceWithState.getDirection()

directionServiceWithState.setState(new BikeState())
directionServiceWithState.getDirection()

directionServiceWithState.setState(new WalkState())
directionServiceWithState.getDirection()

//What is the issue with this code?
// if we want to add new type of transportation, we just need to create a new state class, which is good for open closed principle