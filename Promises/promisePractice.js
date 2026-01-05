let promise_1 = new Promise((resolved, rejected)=>{
    setTimeout(()=>{
        resolved("Promise 1 resolved")
    },6000)
});
let promise_2 = new Promise((resolve, rejected)=>{
    setTimeout(()=>{
        resolve('promise 2 reolved')
    },3000)
});
promise_1.then((successMessage)=>{
    console.log(`Promise_1: ${successMessage}`)
});
promise_2.then((successMessage)=>{
    console.log(`Promise_2: ${successMessage}`);
})
