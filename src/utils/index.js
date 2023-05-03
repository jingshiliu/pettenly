export function debounce(fn, delay){
    let timeoutID
    return function(...args){
        if(timeoutID)
            clearTimeout(timeoutID)
        timeoutID = setTimeout(()=>{
            fn(...args)
        }, delay)
    }
}

export function asyncDebounce(fn, delay){
    let timerId;
    return async (...args) => {
        if (timerId) {
            console.log('clearing timerID', timerId)
            clearTimeout(timerId);
        }
        console.log(timerId)
        return new Promise((resolve) => {
            timerId = setTimeout(async () => {
                const result = await fn(...args);
                resolve(result);
            }, delay);

        });
    };
}