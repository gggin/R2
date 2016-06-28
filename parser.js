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

var code = `
(+ 1 2)


`;

function token(code) {
    var i = 0;
    var c = code[i];
    while (c === '\n' ||
           c === ' ' ||
           c === '  ') {
        i++;
    }

    switch(c) {
        case '(':
        case ')':
        case '+':
        case '-':
        case '*':
        case '/':
            return i;
        case 'l':
            
    }
}

function parse(code) {
    var re = [];
    return re;
}

parse(code);


