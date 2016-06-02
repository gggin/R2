var code = [
['lambda', ['x'], ['+', 'x', ['+', 'y', 'a']]], 3
];

var code2 = [['lambda', ['y'], ['-', 'y', code]], 9];


var code3 = 
[['lambda', ['x'], ['x', 1]], ['lambda', ['y'], ['+', 'a', ['+', 'y', 5]]]]

var index = 0;
var lambdaScopeName = "LAMBDA_";

var env = {'a' : 5};
var currentEnv;

currentEnv = env;
function intep(code) {
    console.log('-------BEGIN---')
    console.log(code);
    console.log('---------------')
    console.log(env);
    console.log('---------------')
    console.log(currentEnv);
    console.log('-------END-----')
    if (typeof code === 'string') {
        var tt = currentEnv;
        var re = tt[code];
        while (re === undefined) {
            tt = tt._p;
            re = tt[code];
        }
        return re;
    } else if (typeof code == 'number') {
        return code;
    }

    if (code.length == 3) {
        if (code[0] === 'lambda') {
            return code;
        }else if (code[0] === '+') {
            return intep(code[1]) + intep(code[2]);        
        } else if (code[0] === '-') {
            return intep(code[1]) - intep(code[2]);        
        } else if (code[0] === '*') {
            return intep(code[1]) * intep(code[2]);        
        } else if (code[0] === '/') {
            return intep(code[1]) / intep(code[2]);        
        } else {
            throw new Error;
        }
    } else if (code.length == 2) {
        var left = intep(code[0]);
        var right = intep(code[1]);
        index++;
        var tmpScope = currentEnv[lambdaScopeName + index] = {};
        var origin = currentEnv;
        currentEnv = tmpScope;
        currentEnv["_p"] = origin;
        var varName = left[1][0];
        tmpScope[varName] = right;
        return intep(left[2]);
    } else {
        throw new Error;
    }
}

//var result = intep(code2);
//console.log(result);

console.log(code3);
var result = intep(code3);
console.log(result);