pragma solidity ^0.4.19;

import "./Seriality/src/Seriality.sol";

contract Serialize is Seriality{

    function stringArrayToBytes(string[] arr) internal view returns(bytes serialized){
        if (arr.length == 0){
            return new bytes(0);
        }

        uint start_index = 0;
        uint end_index = arr.length - 1;
                
        //64 byte is needed for safe storage of a single string.
        //((endindex - startindex) + 1) is the number of strings we want to pull out.
        uint offset = 64*((end_index - start_index) + 1);
        
        bytes memory buffer = new  bytes(offset);
        string memory out1 = new string(32);        
        
        for(uint i = end_index; i >= start_index; i--){
            out1 = arr[i];
            
            stringToBytes(offset, bytes(out1), buffer);
            offset -= sizeOfString(out1);
        }
        
        return (buffer);
    }

    // function getString(bytes buffer) public view returns(string string1, string string2){

    // 	//64 byte is needed for safe storage of a single string.
    // 	//In this example we are returning 2 strings
    // 	uint offset = 64*2;

    // 	buffer = new  bytes(offset);

    // 	string1 = new string(32);
    // 	string2 = new string(32);

    // 	bytesToString(offset, buffer, bytes(string2));
    //     offset -= sizeOfString(string2);

	// 	bytesToString(offset, buffer, bytes(string2));
    //     offset -= sizeOfString(string2);

    //     return(string1, string2);
    // }

}