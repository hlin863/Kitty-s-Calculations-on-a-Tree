class Tree{
    constructor(){
        this.root = null;
        this.children = [];
    }

    addNode(node){
        if(this.root == null){
            this.root = node;
        } else{
            this.children.push(node);
        }
    }

}

function displayTree(tree){
    if (tree.root != null){
        console.log(tree.root);
    }
    for (let i = 0; i < tree.children.length; i++){
        displayTree(tree.children[i]);
    }
}

function processData(input) {
    //Enter your code here
    let inputs = splitInputs(input);
    
    let graph = inputs[0];
    
    // console.log(graph);
    
    let combinations = inputs[1];
    
    // console.log(combinations);
    
    for (let i = 0; i < combinations.length; i++){
        if (combinations[i].length == 0){
            console.log(0);
        } else {
            let distance = distanceFunction(combinations[i], graph);
            console.log(distance);
        }
    }

} 

function inputToArray(input){
    
    let inputArray = input.split(/[\n]/);
    
    return inputArray;
    
}

function elementToNumber(arr){
    
    let arrNumber = [];
    
    for (let i = 0; i < arr.length; i++){
        arrNumber.push(arr[i].split(/[ ]/));
    }
    
    for (let i = 0; i < arrNumber.length; i++){
        
        for (let j = 0; j < arrNumber[i].length; j++){
            arrNumber[i][j] = parseInt(arrNumber[i][j]);
        }
        
    }
    
    return arrNumber;
    
}

function createGraph(array){
    let graph = [];
    
    let index = 0;
    
    for (let i = 0; i < array.length; i++){
        if (array[i].length < 2){
            index = i - 1;
            break;
        } else {
            graph.push(array[i]);
        }
    }
    
    graph.push(index);
    
    return graph;
}

function splitInputs(input){
    
    let inputArray = inputToArray(input); 
    
    let inputArrayNumbers = elementToNumber(inputArray);

    let graph = createGraph(inputArrayNumbers);
    
    let inputs = [];
    
    let graph_index = graph[graph.length - 1];
    
    graph.pop();
    
    let combinations = [];
    
    for (let i = graph_index + 1; i < inputArrayNumbers.length; i+=2){
        combinations.push(combinationArray(inputArrayNumbers[i + 1]));
    }
    
    inputs.push(graph);
    
    inputs.push(combinations);
    
    return inputs;

}

function combinationArray(arr){

    let combinationArray = [];
    
    for (let i = 0; i < arr.length; i++){
        for (let j = i + 1; j < arr.length; j++){
            combinationArray.push([arr[i], arr[j]]);
        }
    }
    
    return combinationArray;

}

function distanceFunction(combinations, array){
    let distance = 0;
    for (let i = 0; i < combinations.length; i++){
        let tree = new Tree();
        tree = graphToTree(array, array[1], tree);
        
        // console.log(combinations);
        
        // console.log("\n");
        
        distance += combinations[i][0] * combinations[i][1] * dist(combinations[i][0], combinations[i][1], tree);
    }
    
    distance = distance % (Math.pow(10, 9) + 7);
    
    return distance;
}

function dist(u, v, tree){
    
    // console.log("u: " + u + " v: " + v);
    
    if (tree == null){
        return 0;
    } else {
        if (tree.root == null){
            return 0;
        } else {
            if (u != tree.root && v != tree.root){
                return dist(u, tree.root) + dist(tree.root, v);
            } else {
                // check if u is a child node of v or v is a child node of u
                let u_index = getNode(u, tree.children);
                let v_index = getNode(v, tree.children);
        
                if (u_index != -1 && v_index != -1){
                    return dist(u, tree.children[u_index].root) + dist(tree.children[v_index].root, v);
                } else if (u_index != -1){
                    return dist(u, tree.children[u_index].root);
                } else if (v_index != -1){
                    return dist(tree.children[v_index].root, v);
                } else {
                    return 1;
                }
            }
        }
    }
    
}



function countNodes(graph, node){
    let count = 0;
    
    for (let i = 0; i < graph.length; i++){
        if (graph[i][0] == node[0]){
            count = count + 1;
        }
    }
    
    return count;
}

function graphToTree(graph, node, tree){
    
    let root = graph[1][0];
    
    tree.addNode(root);
    
    tree = rootIteration(root, graph, tree);
    
    return tree;

}

function rootIteration(root, graph, tree){
    
    for (let i = 1; i < graph.length; i++){
        if (graph[i][0] == root){
            
            let subtree = new Tree();
            
            subtree.addNode(graph[i][1]);
            
            tree.children.push(rootIteration(graph[i][1], graph, subtree));
        }
    }  
    
    return tree;
}

function getNode(n, graph){
    for (let i = 0; i < graph.length; i++){
        if (graph[i][0] == n){
            return i;
        }
    }
    
    return -1;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
