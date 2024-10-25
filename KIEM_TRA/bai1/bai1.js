function isPerfectNumber(n) {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            sum += i;
        }
    }
    return sum === n;
}

setInterval(() => {
    let number = Math.floor(Math.random() * 100) + 1;
    console.log("Số ngẫu nhiên là: " + number);
    if (isPerfectNumber(number)) {
        console.log(number + " là số hoàn hảo.");
    } else {
        console.log(number + " không phải là số hoàn hảo.");
    }
}, 2000);

