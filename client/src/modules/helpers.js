export const h = {
	__index: function(arr, idx) { // used when converting arr[x.y.z] to arr[x][y][z]
		return arr[idx];
	},
	str2arr: function(str, arr, seperator = ".") {
		return str.split(seperator).reduce(h.__index, arr);
	}
};
