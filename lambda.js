var parse = require('./parser');
var _ = require('lodash');

var yinTest1 = parse(`
(+ 1 2)`); // ==> 3

var yinTest2 = parse(`
(* 2 3)`); // ==> 6

var yinTest3 = parse(`
(* 2 (+ 3 4))`); // ==> 14

var yinTest4 = parse(`
(* (+ 1 2) (+ 3 4))`); // ==> 21

var yinTest5 = parse(`
((lambda (x) (* 2 x)) 3)`); // ==> 6

var yinTest6 = parse(`
(let (x 2)
   (let (f (lambda (y) (* x y)))
     (f 3)))`); // ==> 6

var yinTest7 = parse(`
(let (x 2)
   (let (f (lambda (y) (* x y)))
     (let (x 4)
       (f 3))))`);  // ==> 6   

var ginTest1 = parse(`
 ((lambda (x) (x 1))
    (lambda (y) (+ a (+ y 5))))
 `); // if a = 5 // ==> 11

var ginTest2 = parse(`
((lambda (y) (- y 
    ((lambda (x) (+ x (+ y 5))) 3))) 9)`); // ==> -8

var env = {a:5};

function findIn(x, env) {
    var r = env;
    while (r !== undefined) {
        if (r[x] !== undefined)
            return r[x];
        r = r._p;
    }
    return undefined;
}

function extend(key, value, env) {
    env[key] = value;
}

function parentExtend(key, value, env) {
    var o = {};
    o._p = _.clone(env);
    o[key] = value;
    return o;
}

//typeof
//{env: , lambda: (lambda)}

function intep2(exp, env) {
    // console.log(exp);
    // console.log('--')
    // console.log(env);    
    // console.log('----')
    if (_.isString(exp)) {
        var v = findIn(exp, env);
        if (v === undefined) throw "wrong4";
        return v;
    } else if (_.isNumber(exp)) {
        return exp;
    } else if (_.isArray(exp) && exp.length === 2) {
        var l = intep2(exp[0], env);
        var r = intep2(exp[1], env);
        if (l.env && l.lambda) {
            return intep2(l.lambda[2], parentExtend(l.lambda[1][0], r, l.env));
        } else {
            throw new Error('wrong1');
        }
    } else if (_.isArray(exp) && exp.length === 3) {
        if (exp[0] === 'lambda') {
            return { env: env, lambda: exp };
        } else if (exp[0] === 'let') {
            var bindT = exp[1];
            var letExp = exp[2];
            return intep2(letExp,
                parentExtend(bindT[0], intep2(bindT[1], env), env));
        } else {
            if (exp[0] === '+') {
                return intep2(exp[1], env) + intep2(exp[2], env);
            } else if (exp[0] === '-') {
                return intep2(exp[1], env) - intep2(exp[2], env);
            } else if (exp[0] === '*') {
                return intep2(exp[1], env) * intep2(exp[2], env);
            } else if (exp[0] === '/') {
                return intep2(exp[1], env) / intep2(exp[2], env);
            } else {
                throw new Error('wrong3');
            }
        }
    } else {
        throw new Error('wrong2');
    }
}

//var result = intep(code2);
//console.log(result);
function r2(code) {
    console.log(intep2(code, env));
}

r2(yinTest1);
r2(yinTest2);
r2(yinTest3);
r2(yinTest4);
r2(yinTest5);
r2(yinTest6);
r2(yinTest7);
r2(ginTest1);
r2(ginTest2);
