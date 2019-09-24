all: examples/bundle.js

lib:
	mkdir -p lib

lib/index.js: lib src/index.js lib/index.d.ts yarn.lock .babelrc
	./node_modules/.bin/babel src -d lib

lib/index.d.ts: src/index.d.ts
	cp src/index.d.ts lib/index.d.ts

examples/bundle.js: lib/index.js examples/demo.js webpack.config.js
	./node_modules/.bin/webpack

clean:
	rm -rf lib examples/bundle.js
