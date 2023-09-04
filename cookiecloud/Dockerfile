FROM ubuntu:20.04
LABEL maintainer=""

ARG QDK2_VER=0.31
ARG DOCKER_VER=24.0.5

# Install build essentail tools
RUN \
  apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    curl wget fakeroot rsync pv bsdmainutils ca-certificates openssl xz-utils make python2 \
  && rm -rf /var/cache/debconf/* /var/lib/apt/lists/* /var/log/*

# Install qdk2
RUN \
  wget https://ghproxy.com/https://github.com/qnap-dev/qdk2/releases/download/v${QDK2_VER}/qdk2_${QDK2_VER}_bionic_amd64.deb \
  && dpkg -i --force-depends qdk2_${QDK2_VER}_bionic_amd64.deb \
  && rm -f qdk2_${QDK2_VER}_bionic_amd64.deb

# Install docker client
RUN \
  curl -sq https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VER.tgz \
   | tar zxf - -C /usr/bin docker/docker --strip-components=1 \
  && chown root:root /usr/bin/docker

WORKDIR /work
