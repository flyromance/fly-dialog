var glob = require('glob');
var path = require('path');

function getEntry(dir) {
	var ret = {};
	var files = glob.sync(dir);
	var re = /.*\/([\w-.]+)\.js$/;

	console.log(files);

	files.forEach(function (file, index) {
		var match = file.match(re);
		if (match && match[1]) {
			ret[match[1]] = file;
		}
	});

	return ret;
}	

exports.getEntry = getEntry