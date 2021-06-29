

export class Pair<A,B> {
    readonly left:A;
    readonly right:B;

    constructor(left: A, right: B) {
        this.left = left;
        this.right = right;
    }

    public apply<T>(action:(A,B)=>T):T {
        return action(this.left,this.right)
    }

}

