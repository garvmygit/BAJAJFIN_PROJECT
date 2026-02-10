class Helpers {
  static validatePositiveInteger(n) {
    return Number.isInteger(n) && n > 0;
  }

  static validateIntegerArray(arr) {
    return Array.isArray(arr) && arr.every(n => Number.isInteger(n) && n > 0);
  }

  static gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  static lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b);
  }
}

module.exports = Helpers;