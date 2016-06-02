var code = [
['lambda', ['x'], ['+', 'x', ['+', 'y', 'a']]], 3
];

var code2 = [['lambda', ['y'], ['-', 'y', code]], 9];


var code3 = 
[['lambda', ['x'], ['x', 1]], ['lambda', ['y'], ['+', 'a', ['+', 'y', 5]]]]

/*
(let ([x 2])
  (let ([f (lambda (y) (* x y))])
    (let ([x 4])
      (f 3))))
*/

var code4 = 
['let', ['x', 2],
    ['let', ['f', ['lambda', ['y'], ['*', 'x', 'y']]],
        ['let', ['x', 4],
            ['f', 3]
        ]
    ]
];

var index = 0;
var lambdaScopeName = "LAMBDA_";
var letScopeName = "LET_";

var env = {'a' : 5};

function intep(code, cuEnv) {
    console.log('-------BEGIN---')
    console.log(code);
    console.log('---------------')
    console.log(env);
    console.log('---------------')
    console.log(cuEnv);
    console.log('-------END-----')
    if (typeof code === 'string') {
        var tt = cuEnv;
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
            code.env = cuEnv;
            return code;
        } else if(code[0] === 'let') {
            index++;
            var tmpScope = cuEnv[letScopeName + index] = {};
            var origin = cuEnv;
            cuEnv = tmpScope;
            cuEnv["_p"] = origin;
            tmpScope[code[1][0]] = intep(code[1][1], cuEnv);
            return intep(code[2], cuEnv);
        } else if (code[0] === '+') {
            return intep(code[1], cuEnv) + intep(code[2], cuEnv);        
        } else if (code[0] === '-') {
            return intep(code[1], cuEnv) - intep(code[2], cuEnv);        
        } else if (code[0] === '*') {
            return intep(code[1], cuEnv) * intep(code[2], cuEnv);        
        } else if (code[0] === '/') {
            return intep(code[1], cuEnv) / intep(code[2], cuEnv);        
        } else {
            throw new Error;
        }
    } else if (code.length == 2) {
        var left = intep(code[0], cuEnv);
        var right = intep(code[1], cuEnv);
        index++;
        var ttenv = left.env;
        var tmpScope = ttenv[lambdaScopeName + index] = {};
        var origin = ttenv;
        ttenv = tmpScope;
        ttenv["_p"] = origin;
        var varName = left[1][0];
        tmpScope[varName] = right;
        return intep(left[2], ttenv);
    } else {
        throw new Error;
    }
}

//var result = intep(code2);
//console.log(result);

console.log(code4);
var result = intep(code4, env);
console.log(result);