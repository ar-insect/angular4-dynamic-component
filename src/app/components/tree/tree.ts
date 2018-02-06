import { TreeModel } from './tree.types';
import { size, omit, get } from './util';

export class Tree {
    private _children: Tree[];
    private _expand = true;

    get children(): Tree[] {
        return this._children;
    }

    set expand(value: boolean) {
      this._expand = value;
    }

    get expand(): boolean {
      return this._expand;
    }

    node: TreeModel;
    parent: Tree;

    isNodeExpanded() {

    }

    _addChild(child: Tree, position: number = size(this._children) || 0): Tree {
        child.parent = this;

        if (Array.isArray(this._children)) {
            this._children.splice(position, 0, child);
        } else {
            this._children = [child];
        }

        return child;
    }

    private buildTree(model: TreeModel) {
        this.node = omit(model, 'children');
        get(model, 'children', []).forEach((child: TreeModel, index: number) => {
            this._addChild(new Tree(child, this), index);
        });
        console.log(this.children);
    }

    constructor(node: TreeModel, parent: Tree = null) {
        this.buildTree(node);
    }
}
