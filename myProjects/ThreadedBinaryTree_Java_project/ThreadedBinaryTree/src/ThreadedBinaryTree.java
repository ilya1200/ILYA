
/**
 * @author ILYA LIVSHITS
 * 
 *
 */
public class ThreadedBinaryTree {
	private TreeNode _root;
	private TreeNode _median;//Points to the node with the median value.
	
	
	/*CONSTRUCTORS*/

	/**
	 * Constructor, Initializes root to NULL.
	 */
	public ThreadedBinaryTree() {
		_root=null;
		_median=null;
	}
	
	/*METHODES*/

	/**
	 * @param data - to be inserted.
	 */
	public void insert(Data data) {
		TreeNode toInsert;
		TreeNode x=_root;
		TreeNode y=null;
		
		if(search(data)!=null) {
			System.err.println("The insertion failed:A student with the same ID already exists.");
			return;
		}
		
		//Search for the place to the new TreeNode
		toInsert=new TreeNode(data);
		while (x!=null) {
			//isThereLeftChild(x) || isThereRightChild(x)
			y=x;
			x.inc_size();//Update the size field of the node we pass by.
			if(toInsert.get_data().compareTo(x.get_data())<0) {
				if(isThereLeftChild(x)) {
					x=x.get_left();
				}else {
					break;
				}	
			}else {
				if(isThereRightChild(x)) {
					x=x.get_right();
				}else {
					break;
				}
			}
		}
		
		//Insert new TreeNode
		toInsert.set_parent(y);
		if(y==null) {// The tree is empty
			_root=toInsert;
		}else if(toInsert.get_data().compareTo(y.get_data())<0) {
			y.set_left(toInsert);
		}else {
			y.set_right(toInsert);
		}
		
		toInsert.set_left(TreePredecessor(toInsert));
		toInsert.set_right(TreeSuccessor(toInsert));
		
		update_median();//Update the median pointer
	}
	
	
	/**
	 * @param toDelete
	 * @return
	 */
	public TreeNode delete(TreeNode toDelete) {
		TreeNode x,y,z;
//		TreeNode current;

		z=toDelete;
		
		if(!isFromThisTree(z)) {
			throw new IllegalArgumentException("The tree node provided, does not belong to this tree.");
		}
		
		if(!isThereLeftChild(z) || !isThereRightChild(z) ) {
			y=z;
		}else {// z has 2 children
			y=TreeSuccessor(z);
		}
		
		if(isThereLeftChild(y)) {
			x=y.get_left();
		}else if(isThereRightChild(y)) {
			x=y.get_right();
		}else {
			x=null;
		}
		
		if(x!=null) {
			x.set_parent(y.get_parent());
		}
		
		if(y.get_parent()==null) {
			_root=x;
		}else if(isThereLeftChild(y)) {
			y.get_parent().set_left(x);
		}else {
			y.get_parent().set_right(x);
		}
		
		if(y!=z) {
			z.set_data(y.get_data());
		}
		
		//Repair the tree
//		for(current=y.get_parent();y!=null;current=y.get_parent()) {
//			current.dec_size();
//		}
//		update_median();
		
		return y;
	}
	
	/**
	 * Search for the Successor of the specified element.
	 * @param x- A pointer to the element the Successor of which to look for.
	 * @return A pointer to the Successor of x.
	 * @throws IllegalArgumentException - if the node is not from this tree.
	 */
	public TreeNode TreeSuccessor(TreeNode x) {
		
		if(!isFromThisTree(x)) {
			throw new IllegalArgumentException("The tree node provided, does not belong to this tree.");
		}
		
		if (isThereRightChild(x)) {
			return treeMinimum(x.get_right());
		} else if (x.get_right()==null) {
			TreeNode y= x.get_parent();
			while(y!=null && x==y.get_right()) {
				x=y;
				y=y.get_parent();
			}
			return y;
		} else {// It is a thread.
			return x.get_right();
		}
	}
	
	
	/**
	 * Search for the Predecessor of the specified element.
	 * @param x- A pointer to the element the Predecessor of which to look for.
	 * @return A pointer to the Predecessor of x.
	 * @throws IllegalArgumentException - if the node is not from this tree.
	 */
	public TreeNode TreePredecessor(TreeNode x) {
		
		if(!isFromThisTree(x)) {
			throw new IllegalArgumentException("The tree node provided, does not belong to this tree.");
		}
				
		if (isThereLeftChild(x)) {
			return treeMaximum(x.get_left()); 
		} else if (x.get_left()==null) {
			TreeNode y= x.get_parent();
			while(y!=null && x==y.get_left()) {
				x=y;
				y=y.get_parent();
			}
			return y;
		} else {// It is a thread.
			return x.get_left();
		}
	}
	
	
	/**
	 * Performing a search for the specified student ID.
	 * @param studentId - represents the student ID to look for.
	 * @return A pointer to the TreeNode with the specified student ID. Returns null if not found.
	 */
	public TreeNode search(String studentId) {
		String studentNamePlaceHolder="PlaceHolder";
		Data dataToLookFor=new Data(studentId,studentNamePlaceHolder);
		
		return search(dataToLookFor);
	}
	
	/**
	 * Search for the maximum element in tree with the specified root.
	 * @param treeRoot - The root of tree in which to search for the maximum.If null, will look for the maximum of the whole tree.
	 * @return - A pointer to the maximum element.
	 * @throws IllegalArgumentException - if the node is not from this tree.
	 */
	public TreeNode treeMaximum(TreeNode treeRoot) {//PROBLEM *** PROBLEM *** PROBLEM *** PROBLEM 
		TreeNode max;
		
		if(treeRoot==null) {
			treeRoot=this._root;
		}else if(!isFromThisTree(treeRoot)) {
			throw new IllegalArgumentException("The tree node provided, does not belong to this tree.");
		}
			
		max=treeRoot;
		while(isThereRightChild(max)) {
			max=max.get_right();
		}
		
		return max;
	}
	
	/**
	 * Search for the minimum element in tree with the specified root.
	 * @param treeRoot - The root of tree in which to search for the minimum.If null, will look for the minimum of the whole tree.
	 * @return - A pointer to the minimum element.
	 * @throws IllegalArgumentException - if the node is not from this tree.
	 */
	public TreeNode treeMinimum(TreeNode treeRoot) {
		TreeNode min;

		if(treeRoot==null) {
			treeRoot=this._root;
		}else if(!isFromThisTree(treeRoot)) {
			throw new IllegalArgumentException("The tree node provided, does not belong to this tree.");
		}
		
		min=treeRoot;
		while(isThereLeftChild(min)) {
			min=min.get_left();
		}
		
		return min;
	}
	
	/**
	 * @return A pointer to the treeNode in this tree with the median.
	 */
	public TreeNode get_median() {
		return this._median;
	}
	
	/**
	 * Performs in-order treeWalk and prints the content of the tree.
	 */
	public void inorderTreeWalk() {
		TreeNode current;
		
		if(_root==null) {
			return;
		}
		
		current=getLeftMostTreeNode(_root);
		while(current!=null) {
			System.out.printf("%s", current.get_data().toString());
			if(!isThereRightChild(current)) {
				current=TreeSuccessor(current);
			}else {
				current=getLeftMostTreeNode(current.get_right());
			}
		}
		System.out.println();
	}
	
	/**
	 * Performs pre-order treeWalk and prints the content of the tree.
	 */
	public void preorderTreeWalk() {
		preorderTreeWalk(this._root);
		System.out.println();
	}
	 
	
	/**
	 * Performs post-order treeWalk and prints the content of the tree.
	 */
	public void postorderTreeWalk() {
		postorderTreeWalk(this._root);
		System.out.println();
	}
	
	/*PRIVATE METHODES*/
	
	/**
	 * Performs post-order treeWalk and prints the content of the tree.
	 */
	private void postorderTreeWalk(TreeNode x) {
		if(x!=null) {		
			if(isThereLeftChild(x)) {
				postorderTreeWalk(x.get_left());
			}

			if(isThereRightChild(x)){
				postorderTreeWalk(x.get_right());
			}
			System.out.printf("%s", x.get_data().toString());
		}
	}
	
	/**
	 * Performs pre-order treeWalk and prints the content of the tree.
	 */
	private void preorderTreeWalk(TreeNode x) {
		if(x!=null) {
			System.out.printf("%s", x.get_data().toString());
			if(isThereLeftChild(x)) {
				preorderTreeWalk(x.get_left());
			}
			if(isThereRightChild(x)){
				preorderTreeWalk(x.get_right());
			}
		}
	}
	
	
	/**
	 * Search for the leftmost TreeNode in the specified  subtree.
	 * @param data - A pointer to the subtree root.
	 * @return A pointer to the leftmost TreeNode.
	 */
	private TreeNode getLeftMostTreeNode(TreeNode subTreeRoot) {
		TreeNode leftMostTreeNode;
		
		leftMostTreeNode=subTreeRoot;
		
		while(isThereLeftChild(leftMostTreeNode)) {
			leftMostTreeNode=leftMostTreeNode.get_left();
		}
		
		return leftMostTreeNode;
	}
	
	/**
	 * Search for the specified data in the tree.
	 * @param data - To look for.
	 * @return A pointer to the node with the specified data.If not found, return null.
	 */
	private TreeNode search(Data data) {
		TreeNode x=_root;
			
		while ((isThereLeftChild(x) || isThereRightChild(x))&& !(data.equals(x.get_data()))) {
			if(data.compareTo(x.get_data())<0) {
				x=x.get_left();
			}else {
				x=x.get_right();
			}
		}
		if((x!=null)&&(data.equals(x.get_data()))) {
			return x;// FOUND
		}
		return null; //NOT FOUND	
	}//END search()
	

	/**
	 * @param x - The tree node which we want to check if belongs to this tree.
	 * @return True if the node belongs to this tree, False otherwise.
	 */
	private boolean isFromThisTree(TreeNode x) {
		TreeNode thisRoot=this._root;
		TreeNode thatRoot;
		

		while(x!=null && x.get_parent()!=null) {
			x=x.get_parent();
		}
		
		thatRoot=x;	
		if(thisRoot==null || thatRoot==null) {
			return false;
		}
		
		return thisRoot==thatRoot;
	}

	
	/**
	 * @return true if this node has real left child : non null and no thread.
	 */
	private boolean isThereLeftChild(TreeNode node) {
		boolean isLeftChild= (node!=null)&&(node.get_left()!=null)&&(node==node.get_left().get_parent());
		return isLeftChild;
	}
	
	/**
	 * @return true if this node has real right child : non null and no thread.
	 */
	private boolean isThereRightChild(TreeNode node) {
		boolean isRightChild= (node!=null)&&(node.get_right()!=null)&&(node==node.get_right().get_parent());
		return isRightChild;
	}
	
	/**
	 * Updates the _median attribute.
	 */
	private void update_median() {
		int median=((this._root.get_size()+1)/2);
		this._median=os_select(_root,median);
	}
	
	
	/**
	 * Looking for the TreeNode with i-th value position.
	 * @param x - The tree node which we want to search.
	 * @param i- specifies the the value order of which to look for.
	 * @return A pointer to the TreeNode with i-th value.
	 */
	private TreeNode os_select(TreeNode x,int i) {
		int r;
		
		if(x==null) {
			return null;
		}
		
		if(x.get_left()!=null) {
			r= x.get_left().get_size()+1;	
		}else {
			r=1;
		}
			
		if (i==r) {
			return x;
		}else if(i<r) {
			return os_select(x.get_left(),i);
		}else {
			return os_select(x.get_right(),i-r);
		}
	}
	
}//END ThreadedBinaryTree
