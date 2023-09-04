SHELL              := /bin/bash
BUILDER_IMAGE_NAME := qnap/qpkg-builder
BUILD_DIR          := build
SUPPORT_ARCH       := x86_64
CODESIGNING_TOKEN  ?= 

COLOR_YELLOW       := \033[33m
COLOR_BLUE         := \033[34m
COLOR_RESET        := \033[0m

.PHONY: build
build: docker-builder
	@if [ ! -f /.dockerenv ]; then \
		docker run --rm -t --name=build-capp-qpkg-$$$$ \
			-e QNAP_CODESIGNING_TOKEN=$(CODESIGNING_TOKEN) \
			-v /var/run/docker.sock:/var/run/docker.sock \
			-v $(PWD):/work \
			$(BUILDER_IMAGE_NAME) make _build; \
	else \
		$(MAKE) -$(MAKEFLAGS) _build; \
	fi

.PHONY: _build
_build: docker-image
	@echo -e "$(COLOR_BLUE)### Build QPKG ...$(COLOR_RESET)"
	fakeroot /usr/share/qdk2/QDK/bin/qbuild --build-dir $(BUILD_DIR) --xz amd64

.PHONY: docker-builder
docker-builder:
	@echo -e "$(COLOR_BLUE)### Prepare QPKG builder: $(BUILDER_IMAGE_NAME)$(COLOR_RESET)"
	docker build -t $(BUILDER_IMAGE_NAME) .

.PHONY: docker-image
docker-image:
	@for img in $(shell awk -F'image: ' '/image:/ {print $$2}' x86_64/docker-compose.yml); do \
		tarball=$$(echo $${img} | sed -e 's?/?-?' -e 's?:?_?').tar; \
		echo -e "$(COLOR_BLUE)### Download container image: $${img}$(COLOR_RESET)"; \
		docker pull $${img}; \
		echo -e "$(COLOR_YELLOW)### Save container image to a tar archive: $${tarball}$(COLOR_RESET)"; \
		mkdir -p x86_64/docker-images; \
		echo $${img} >> x86_64/docker-images/DOCKER_IMAGES; \
		docker save -o x86_64/docker-images/$${tarball} $${img}; \
	done

.PHONY: clean
clean:
	@echo -e "$(COLOR_BLUE)### Remove build files ...$(COLOR_RESET)"
	rm -rf */{data,docker-images}
	rm -rf build{,.*}/ tmp.*/
