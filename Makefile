default: generate
generate:
#	jade src/jade/[^_]* -O ./  # compile all jade templates to html
	cp src/html/*.html ./  # copy prepared html files to destination directory
	scss -t compressed --update src/scss:static/css  # compile all scss files to css
	coffee -o static/js -c src/coffee  # compile all client-side coffeescript to javascript

clean:
	rm -f *.html static/css/*.css static/js/*.js

.PHONY: generate clean
