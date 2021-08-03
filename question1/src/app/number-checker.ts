export function isPrime(n: number) {
    for (let i = 2; i < n; ++i) {
        if (n % i === 0) {
            return false;
        }
    }
    return n > 1;
}

// Ref: https://www.geeksforgeeks.org/check-number-fibonacci-number/
export function isFibonacci(n: number) {
    return isPerfectSquare(5 * n * n + 4) ||
        isPerfectSquare(5 * n * n - 4);
}

export function isPerfectSquare(n: number) {
    const s = Math.sqrt(n);
    return s * s === n;
}

export default {
    isPrime,
    isFibonacci,
    isPerfectSquare
}