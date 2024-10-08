import Controller from './Controller.js';
import MathsApi from '../wwwroot/API_Maths.js';

export default class MathsController extends Controller {
    async get(id) { 
        let { op, x, y, n } = this.HttpContext.path.params || {};
        let result;
        let error;


        if (op === ' ') {
            op = '+';
        }
        if (['+', '-', '*', '/', '%'].includes(op)) {
            if (isNaN(x) || isNaN(y)) {
                error = "'x' and/or 'y' parameters are not valid numbers.";
            }
        }
        
        if (['!', 'p', 'np'].includes(op)) {
            if (isNaN(n)) {
                error = "'n' parameter is not a valid number.";
            } else if (parseInt(n) <= 0) {
                error = "'n' parameter must be greater than 0.";
            }
        }
        
        switch (op) {
            case '+':
                result = parseFloat(x) + parseFloat(y);
                break;
            case '-':
                result = parseFloat(x) - parseFloat(y);
                break;
            case '*':
                result = parseFloat(x) * parseFloat(y);
                break;
            case '/':
                if (y === '0' || parseFloat(y) === 0) {
                    error = "Division by zero results in infinity";
                } else if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                    error = "Invalid number for division";
                } else {
                    result = parseFloat(x) / parseFloat(y);
                }
                break;
                case '%':
                    if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
                        error = "Modulus operation resulted in NaN due to invalid numbers";
                    } else if (parseFloat(y) === 0) {
                        error = "Modulus by zero is undefined";
                    } else if (parseFloat(x) === 0) {
                        result = 0; 
                    } else {
                        result = parseFloat(x) % parseFloat(y);
                    }
                    break;
            case '!':
                if (parseInt(n) < 0) {
                    error = "'n' must be greater than or equal to 0 for factorial";
                } else {
                    result = factorial(parseInt(n));
                }
                break;
            case 'p':
                if (parseInt(n) <= 0) {
                    error = "'n' must be greater than 0 to check if prime";
                } else {
                    result = isPrime(parseInt(n));
                }
                break;
            case 'np':
                if (parseInt(n) <= 0) {
                    error = "'n' must be greater than 0 to find nth prime number";
                } else {
                    result = findPrime(parseInt(n));
                }
                break;
            default:
                error = "Unknown operation";
                break;
        }

        this.HttpContext.response.JSON({ op, x, y, n, value: result , error: error});
    }
}
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function isPrime(value) {
    for (let i = 2; i < value; i++) {
        if (value % i === 0) return false;
    }
    return value > 1;
}

function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) primeNumber++;
    }
    return primeNumber;
}