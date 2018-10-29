/**
 * @author ILYA LIVSHITS
 *
 */
public class Data {
	private String _studentId;// KEY
	private String _studentName;
	
	private static final int STUDENT_ID_LENGTH=10;
	private static final int STUDENT_NAME_LENGTH=20;
	
	/*CONSTRUCTORS*/
	
	/**
	 * Description: Initializes the Data object.
	 * @param: studenId -Represents student ID - must be non null or empty ,contain numbers only and in appropriate length.
	 * @param: studentName-Represents student name-should be non null or empty,contain only letters and in appropriate length.
	 * @throws: IllegalArgumentException - If the ID or the name are invalid.
	 * */
	public Data(String studentId, String studentName) {
				
		boolean isIdValid=isValidId(studentId) ;
		boolean isNameValid= isValidName(studentName) ;
		
		if(!isIdValid) {
			throw new IllegalArgumentException("Student ID in invalid : must be non null or empty ,contain only numbers,and be no longer than " +STUDENT_ID_LENGTH +" digits"); 
		}
		
		if(!isNameValid) {
			throw new IllegalArgumentException("Student name is invalid: must be non null or empty ,contain only letters, and be no longer than "+STUDENT_NAME_LENGTH +" chars"); 					
		}
		
		this._studentName = studentName;
		this._studentId = studentId;
	}
	
	/**
	 * Copy constructor.
	 * @param: _data the Data object to be copied.
	 * @throws: IllegalArgumentException - If the ID or the name are invalid.
	 * */
	public Data(Data _data) {
		this(_data._studentId,_data._studentName);
	}

	/*METHODES*/
	
	
	/**
	 * Returns the student ID.
	 * @return:Student ID.
	 * */
	public String get_studentId() {
		return _studentId;
	}

	/**
	 * Sets the student ID.
	 * @param:_studentId- The ID to be set as the student ID.
	 * @throws:IllegalArgumentException - If the the student ID is invalid.
	 * */
	public void set_studentId(String _studentId) {
		boolean isIdValid=isValidId(_studentId);

		if(!isIdValid) {
			throw new IllegalArgumentException("Student ID in invalid : must be non null or empty ,contain only numbers,and be no longer than " +STUDENT_ID_LENGTH +" digits"); 
		}
		this._studentId = _studentId;
	}

	
	/**
	 * Returns the student name.
	 * @return:Student name.
	 * */
	public String get_studentName() {
		return _studentName;
	}

	/**
	 * Sets the student name.
	 * @param:_studentName- The student name to be set.
	 * @throws:IllegalArgumentException - If the the student name is invalid.
	 * */
	public void set_studentName(String _studentName) {
		boolean isNameValid= isValidName(_studentName) ;
		
		if(!isNameValid) {
			throw new IllegalArgumentException("Student name is invalid: must be non null or empty ,contain only letters, and be no longer than "+STUDENT_NAME_LENGTH +" chars"); 					
		}
		this._studentName = _studentName;
	}
	
	
	
	/**
	 * Compares this Data object with the specified Data object by studentId attribute.
	 * @param _data represents the Data object to be compared.
	 * @return a negative integer, zero, or a positive integer as this Data object is less than, equal to, or greater than the specified Data object
	 * @throws NullPointerException if _data is null.
	 */
	public int compareTo(Data _data) {
		
		long d1;
		long d2;
		
		if(_data==null) {
			throw new NullPointerException("_data isn't allowed to be null");
		}
		
		d1=Long.parseLong(this._studentId);
		d2=Long.parseLong(_data._studentId);
		if(d1<d2) {
			return -1;
		}else if(d2<d1) {
			return 1;
		}else {
			return 0;
		}		
	}
	
	
	/**
	 * Checks if this Data is equal to the specified Data object by studentId attribute.
	 * @param _data represents the Data object to be compared.
	 * @return true if equals, false otherwise.
	 * @throws NullPointerException if _data is null.
	 */
	public boolean equals(Data _data) {
		boolean areEquals= this.compareTo(_data)==0;
		return areEquals;
	}
	
	/**
	 * Returns a string representation of the Data object.
	 * @return a string representation of the Data object.
	 */
	@Override
	public String toString() {
		String str1= "("+this._studentId+";"+this._studentName+")";	
		return str1;
	}
	
	/*PRIVATE METHODES*/
	
	/**
	 * Validates the student name.Must be non null or empty string, contain only letters no longer than STUDENT_NAME_LENGTH
	 * @param _studentName - represents the student name.
	 * @return true if valid , false otherwise
	 */
	private boolean isValidName(String _studentName) {
		int studentNameLength;
		boolean isNameValid= false;
		
		if(_studentName!=null) {
			studentNameLength= _studentName.length();
			isNameValid= (studentNameLength>0 && studentNameLength<=STUDENT_NAME_LENGTH) && isAlpha(_studentName) ;
		}
		
		return isNameValid;
	}
	

	/**
	 * Checks if the specified string contains only letters. 
	 * @param str - the string to validate.
	 * @return true if the string contains only letters, false otherwise
	 */
	private boolean isAlpha(String str) {
	    char[] chars = str.toCharArray();

	    for (char c : chars) {
	        if(!Character.isLetter(c)) {
	            return false;
	        }
	    }

	    return true;
	}
	
	/**
	 * Validates the student ID.Must be non null or empty string, contain only digits no longer than STUDENT_NAME_LENGTH
	 * @param _studentId - represents the student ID.
	 * @return true if valid , false otherwise
	 */
	private boolean isValidId(String _studentId) {
		int studentIdLength;		
		boolean isIdValid= false;
		
		if(_studentId!=null) {
			studentIdLength=_studentId.length();
			isIdValid=  (studentIdLength>0 && studentIdLength<=STUDENT_ID_LENGTH)&& isNumeric(_studentId);
		}
				
		return isIdValid;
	}
	
	/**
	 * Checks if the specified string contains only digits. 
	 * @param str - the string to validate.
	 * @return true if the string contains only digits, false otherwise
	 */
	private boolean isNumeric(String str) {
	    char[] chars = str.toCharArray();

	    for (char c : chars) {
	        if(!Character.isDigit(c)) {
	            return false;
	        }
	    }

	    return true;
	}
	
}//END DATA
