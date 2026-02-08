//Here We only send data to the subscriberes, instead of subscribers checking each time the channel


class Channel{

      subscribers: IndividualSubscriber[] = []

      subscribe(name: IndividualSubscriber){
        this.subscribers.push(name)
      }

      unsubscribe(name: string){
        this.subscribers = this.subscribers.filter((e)=>e?.name != name)
      }

      notify(message: string){
         for (const obs of this.subscribers) {
            obs.update(message);
        }
      }

      publish(video: string) {
        console.log(`Channel: New video "${video}" published!`);
        this.notify(video);
     }

}

class IndividualSubscriber{
    name: string
    constructor(name:string){
       this.name = name
    }

    update(video: string) {
        console.log(`${this.name} got notified about: ${video}`);
    }
}

const alice = new IndividualSubscriber("Alice")
const bob = new IndividualSubscriber("Bob")

const channel = new Channel()

channel.subscribe(alice)
channel.subscribe(bob)

channel.publish("Observer Pattern in TypeScript");


// Observer = 1 thing changes → many things react, without tightly coupling them.
// no need to change 1 thing... new subscribers will work automatcally

// Bell (Channel)
//       |
//       v
//  ----------------------
//  |       |            |
// Canteen Classrooms   Office
// (start)   (start)    (start)
// Bell just sends a signal → each subscriber handles its own logic

// That’s why it’s flexible and maintainable
