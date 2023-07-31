export interface Counter {
	name: string
value: number
}

export class CounterProc {
 constructor(counters: Array<Counter>) {
  this.counters = counters;
}
  counters: Array<Counter>
Get() {
	this.counters
}
Create(counter: Counter) {
	this.counters = 
    (() => {
    let a = [...this.counters];
    a.push(counter);

    return a;
    })();
    
}
Increment(name: string) {
	function findCounter(counter: Counter) {
	let ret = 
    counter.name === name
    ; return ret;
}

function updateCounter(counter: Counter) {
	let ret = { name: counter.name, value: counter.value + 1 }; return ret;
}

this.counters = 
    (() => {
      const index = this.counters.findIndex((a) => findCounter(a));
      let ret = [...this.counters];
      ret[index] = updateCounter(ret[index]);

      return ret;
    })();
    
}
}
