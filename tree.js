
var exampleTree = ['+',
['+', 1, 2], ['-',['+',3,4], ['+',5, ['+',6,7]]]
]

function treeSum(tree) {
    if (typeof tree === 'number')
        return tree;
    else {
        var o = tree[0];
        var a1 = tree[1];
        var a2 = tree[2];
        if (o === '+') {
            return treeSum(a1) + treeSum(a2);
        } else if (o === '-') {
            return treeSum(a1) - treeSum(a2);
        } else {
            throw new Error('no operator');
        }
    }
}

var result = treeSum(exampleTree);
console.log(result);