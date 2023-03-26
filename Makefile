.PHONY: all

all: dist/static/styles/project.css \
  dist/static/favicon.png \
  dist/static/images/profile.jpg \
  $(patsubst node_modules/@fontsource/titillium-web/files/titillium-web-%,dist/static/styles/files/titillium-web-%,$(wildcard node_modules/@fontsource/titillium-web/files/titillium-web-*)) \
  $(patsubst node_modules/font-awesome/fonts/fontawesome-%,dist/static/fonts/fontawesome-%,$(wildcard node_modules/font-awesome/fonts/fontawesome-*)) \
  $(patsubst assets/images/%.jpg,dist/static/images/%.webp,$(wildcard assets/images/*.jpg)) \
  $(patsubst assets/images/%.png,dist/static/images/%.webp,$(wildcard assets/images/*.png)) \
  $(patsubst assets/images/%,dist/static/images/%,$(wildcard assets/images/*.svg))

.PHONY: clean
clean:
	rm -rf dist/static/

dist/static/styles/project.css: assets/scss/project.scss
	node_modules/.bin/sass $< $@

dist/static/styles/files/titillium-web-%: node_modules/@fontsource/titillium-web/files/titillium-web-%
	@mkdir -p $(@D)
	cp $< $@

dist/static/fonts/fontawesome-%: node_modules/font-awesome/fonts/fontawesome-%
	@mkdir -p $(@D)
	cp $< $@

dist/static/images/%.webp: assets/images/%.jpg
	@mkdir -p $(@D)
	node_modules/.bin/cwebp $< -o $@

dist/static/images/%.webp: assets/images/%.png
	@mkdir -p $(@D)
	node_modules/.bin/cwebp $< -o $@

dist/static/images/%.svg: assets/images/%.svg
	@mkdir -p $(@D)
	node_modules/.bin/svgo $< -o $@

dist/static/favicon.png: assets/favicon.png
	@mkdir -p $(@D)
	cp $< $@

dist/static/images/profile.jpg: assets/images/profile.jpg
	@mkdir -p $(@D)
	cp $< $@
