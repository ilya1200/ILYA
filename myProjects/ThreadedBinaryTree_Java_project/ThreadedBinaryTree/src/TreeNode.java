/**
 * @author ILYA LIVSHITS
 *
 */
public class TreeNode {
	
	private Data _data;
	private TreeNode _parent; 
	private TreeNode _left; 
	private TreeNode _right;
	private int _size; // Represents the number of nodes attached on the left and on the right include this node itself
	

	
	/*CONSTRUCTORS*/
	
	
	/**
	 * @param _data -Represents a Data object to be set in the node.
	 */
	public TreeNode(Data data){
		this(data,null,null,null);	
	}


	/**
	 * @param _data -Represents a Data object to be set in the node.
	 * @param _parent -Pointer to the parent node.
	 * @param _left - Pointer to the left node.
	 * @param _right - Pointer the the right node.
	 * @throws NullPointerException - if the _data is null.
	 */
	private TreeNode(Data _data,TreeNode _parent,TreeNode _left, TreeNode _right) {	
	
		if(_data==null) {
			throw new NullPointerException("_data is not allowed to be null.");
		}
		
		this._data = new Data(_data);
		this._parent = _parent;
		this._left = _left;
		this._right = _right;
		this._size=1;
	}


	/*METHODES*/
	
	/**
	 * @return A pointer to a Data object which the node holds.
	 */
	public Data get_data() {
		return new Data(_data);
	}
	
	/**
	 * @param _data -Represents a Data object to be set in the node.
	 * @throws NullPointerException - if the _data is null.
	 */
	public void set_data(Data _data) {
		if(_data==null) {
			throw new NullPointerException("_data is not allowed to be null.");
		}	
		this._data = new Data(_data.get_studentId(),_data.get_studentName());
	}
	
	/**
	 * @return A pointer to the parent node.
	 */
	public TreeNode get_parent() {
		return _parent;
	}

	/**
	 * @param _parent -A pointer to the parent node to be set for this node.
	 */
	public void set_parent(TreeNode _parent) {
		this._parent = _parent;
	}

	/**
	 * @return A pointer to the left node.
	 */
	public TreeNode get_left() {
		return _left;
	}

	/**
	 * @param _left -A pointer to the left node to be set for this node.
	 */
	public void set_left(TreeNode _left) {
		this._left = _left;
	}
	
	/**
	 * @return A pointer to the right node.
	 */
	public TreeNode get_right() {
		return _right;
	}
	
	/**
	 * @param _right -A pointer to the right node to be set for this node.
	 */
	public void set_right(TreeNode _right) {
		this._right = _right;
	}
	
	/**
	 * Increase the _size value by 1.
	 */
	public void inc_size() {
		this._size=this._size+1;
	}
	
	
	/**
	 * Decrease the _size value by 1.
	 */
	public void dec_size() {
		this._size=this._size-1;
	}
	
	/**
	 * @return The size value of this node.
	 */
	public int get_size() {
		return this._size;
	}
}//END TreeNode
