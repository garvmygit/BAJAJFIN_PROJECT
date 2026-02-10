const Helpers = require('../utils/helpers');

class MathService {
  calculateLCM(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = Helpers.lcm(result, numbers[i]);
    }
    return result;
  }

  calculateHCF(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = Helpers.gcd(result, numbers[i]);
    }
    return result;
  }
}

module.exports = new MathService();