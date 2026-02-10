class FibonacciService {
  generateFibonacci(n) {
    if (n <= 0) return [0];
    
    const fibonacci = [0, 1];
    
    for (let i = 2; i <= n; i++) {
      fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    
    return fibonacci;
  }

  isFibonacci(num) {
    const isPerfectSquare = (x) => {
      const s = Math.sqrt(x);
      return s * s === x;
    };
    
    return isPerfectSquare(5 * num * num + 4) || 
           isPerfectSquare(5 * num * num - 4);
  }
}

module.exports = new FibonacciService();