default: generate
generate:
	jade src/jade -O ./
	rm _*.html
	cp src/html/*.html ./
	scss -t compressed --update src/scss:static/css
	coffee -o static/js -c src/coffee

clean:
	rm -f *.html static/css/*.css static/js/*.js

.PHONY: clean
