var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var MarkdownIt = require('markdown-it');
var mdi = new MarkdownIt({
	html: true
});

var pathDir = {
	source: path.resolve(__dirname, '..', 'index.md'),
	template: path.resolve(__dirname, '..', 'template/index-webpack.html'),
	output: path.resolve(__dirname, '..', 'index.html')
}

console.log(chalk.blue.bgRed.bold('start...'));

var source = fs.readFileSync(pathDir.source, 'utf8');
var template = fs.readFileSync(pathDir.template, 'utf8');

var content = mdi.render(source);

function transform(cont, option) {
	return cont.replace(/\{\%\s*([^\}\%\s]+)\s*\%\}/g, function ($0, $1) {
		return option[$1];
	})
};

var html = transform(template, {
	title: 'artDialog',
	content: content
});

fs.writeFileSync(pathDir.output, html, 'utf8'); // 再写入(没有就创建文件)

console.log(chalk.blue.bgRed.bold('complete...'));