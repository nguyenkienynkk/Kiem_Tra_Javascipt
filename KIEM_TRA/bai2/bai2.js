const mang = [10, 5, 2, 5, 6, 7, 8, 9];

function calculateSum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function findDivisibleBy3(arr) {
    return arr.filter(num => num % 3 === 0);
}

function findPrimes(arr) {
    return arr.filter(num => isPrime(num));
}

setTimeout(() => {
    console.log("Tổng các phần tử trong mảng: " + calculateSum(mang));
}, 3000);

setTimeout(() => {
    console.log("Các số nguyên tố trong mảng: " + findPrimes(mang));
}, 6000);

setTimeout(() => {
    console.log("Các số chia hết cho 3 trong mảng: " + findDivisibleBy3(mang));
}, 9000);