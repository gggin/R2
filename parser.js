/**
 * Created by fm369 on 6/28/2016.
 */


var yinTest1 =
    ['+', 1, 2];

var yinTest2 =
    ['*', 2, 3];

var yinTest3 =
    ['*', 2, ['+', 3, 4]];

var yinTest4 =
    ['*', ['+', 1, 2], ['+', 3, 4]];

var yinTest5 =
    [['lambda', ['x'], ['*', 2, 'x']], 3];

var yinTest6 =
    ['let', ['x', 2],
        ['let', ['f', ['lambda', ['y'], ['*', 'x', 'y']]],
            ['f', 3]]];

var yinTest7 =
    ['let', ['x', 2],
        ['let', ['f', ['lambda', ['y'], ['*', 'x', 'y']]],
            ['let', ['x', 4],
                ['f', 3]
            ]
        ]
    ];

var code1 = `
(+ 1 2)
`;

var code2 = `
(* 2 (+ 3 4))
`

var code7 = `
(let (x 2)
    (let (f (lambda (y) (* x y)))
        (let (x 4)
            (f 3))))
`

var la = require("lisp-to-array");
/*
var result = la(code1);
console.log(result);
result = la(code2);
console.log(result);
result = la(code7);
console.log(JSON.stringify(result));
*/
module.exports = la;


