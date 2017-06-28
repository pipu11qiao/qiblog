##markdown#
There's a few options that precede this project but they all treat markdown to HTML conversion as a single step process. You pass markdown in and get HTML out, end of story. 
#### Usage
##### Node
~~~javascript
	var markdown = require('markdown').markdown;
	console.log(markdown.toHTML("Hello *World*!));
~~~