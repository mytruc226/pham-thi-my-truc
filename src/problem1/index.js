var sum_to_n_a = function(n) {
    let sum = 0;
    for(let i=1; i <=n; i++){
        sum+=i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    return Array.from({length: n},(_,i)=>i+1).reduce((sum,cur)=>sum+cur)
};

var sum_to_n_c = function(n) {
    if(n<=1) return n;
    return n + sum_to_n_c(n-1);
};