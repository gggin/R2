var code = [
['lambda', ['x'], ['+', 'x', ['+', 'y', 'a']]], 3
];

var code2 = [['lambda', ['y'], ['-', 'y', code]], 9];

console.log(code2);

var index = 0;
var lambdaScopeName = "LAMBDA_";

var env = {'a' : 5};
var currentEnv;

currentEnv = env;
function intep(code) {
    console.log(env);
    if (code[0] === 'lambda') {
        
        //tmpScope[varName]
        return intep(code[2]);
    } else if(typeof code[0] === 'object') {
        index++;
        var tmpScope = currentEnv[lambdaScopeName + index] = {};
        var origin = currentEnv;
        currentEnv = tmpScope;
        currentEnv["_p"] = origin;
        var varName = code[0][1][0];
        tmpScope[varName] = intep(code[1]);
        return intep(code[0]);
    } else if (code[0] === '+') {
        return intep(code[1]) + intep(code[2]);        
    } else if (code[0] === '-') {
        return intep(code[1]) - intep(code[2]);        
    } else if (code[0] === '*') {
        return intep(code[1]) * intep(code[2]);        
    } else if (code[0] === '/') {
        return intep(code[1]) / intep(code[2]);        
    } else if (typeof code === 'string') {
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
}

var result = intep(code2);
console.log(result);