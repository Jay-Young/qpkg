#!/usr/bin/env sh
set -eu

# Copied from ../lib.sh except we do not rename Darwin and we do not need to
# detect Alpine.
os() {
  osname=$(uname | tr '[:upper:]' '[:lower:]')
  case $osname in
    cygwin* | mingw*) osname="windows" ;;
  esac
  echo "$osname"
}

# Create a symlink at $2 pointing to $1 on any platform.  Anything that
# currently exists at $2 will be deleted.
symlink() {
  source="$1"
  dest="$2"
  rm -rf "$dest"
  case $OS in
    windows) mklink /J "$dest" "$source" ;;
    *) ln -s "$source" "$dest" ;;
  esac
}

# VS Code bundles some modules into an asar which is an archive format that
# works like tar. It then seems to get unpacked into node_modules.asar.
#
# I don't know why they do this but all the dependencies they bundle already
# exist in node_modules so just symlink it. We have to do this since not only
# Code itself but also extensions will look specifically in this directory for
# files (like the ripgrep binary or the oniguruma wasm).
symlink_asar() {
  symlink node_modules node_modules.asar
}

# Make a symlink at bin/$1/$3 pointing to the platform-specific version of the
# script in $2.  The extension of the link will be .cmd for Windows otherwise it
# will be whatever is in $4 (or no extension if $4 is not set).
symlink_bin_script() {
  oldpwd="$(pwd)"
  cd "bin/$1"
  source="$2"
  dest="$3"
  ext="${4-}"
  case $OS in
    windows) symlink "$source.cmd" "$dest.cmd" ;;
    darwin | macos) symlink "$source-darwin.sh" "$dest$ext" ;;
    *) symlink "$source-linux.sh" "$dest$ext" ;;
  esac
  cd "$oldpwd"
}

OS="$(os)"

# This is due to an upstream issue with RHEL7/CentOS 7 comptability with node-argon2
# See: https://github.com/cdr/code-server/pull/3422#pullrequestreview-677765057
export npm_config_build_from_source=true

main() {
  # Grabs the major version of node from $npm_config_user_agent which looks like
  # yarn/1.21.1 npm/? node/v14.2.0 darwin x64
  major_node_version=$(echo "$npm_config_user_agent" | sed -n 's/.*node\/v\([^.]*\).*/\1/p')

  if [ -n "${FORCE_NODE_VERSION:-}" ]; then
    echo "WARNING: Overriding required Node.js version to v$FORCE_NODE_VERSION"
    echo "This could lead to broken functionality, and is unsupported."
    echo "USE AT YOUR OWN RISK!"
  fi

  if [ "$major_node_version" -ne "${FORCE_NODE_VERSION:-16}" ]; then
    echo "ERROR: code-server currently requires node v16."
    if [ -n "$FORCE_NODE_VERSION" ]; then
      echo "However, you have overrided the version check to use v$FORCE_NODE_VERSION."
    fi
    echo "We have detected that you are on node v$major_node_version"
    echo "You can override this version check by setting \$FORCE_NODE_VERSION,"
    echo "but configurations that do not use the same node version are unsupported."
    exit 1
  fi

  case "${npm_config_user_agent-}" in npm*)
    # We are running under npm.
    if [ "${npm_config_unsafe_perm-}" != "true" ]; then
      echo "Please pass --unsafe-perm to npm to install code-server"
      echo "Otherwise the postinstall script does not have permissions to run"
      echo "See https://docs.npmjs.com/misc/config#unsafe-perm"
      echo "See https://stackoverflow.com/questions/49084929/npm-sudo-global-installation-unsafe-perm"
      exit 1
    fi
    ;;
  esac

  if ! vscode_install; then
    echo "You may not have the required dependencies to build the native modules."
    echo "Please see https://github.com/coder/code-server/blob/main/docs/npm.md"
    exit 1
  fi

  if [ -n "${FORCE_NODE_VERSION:-}" ]; then
    echo "WARNING: The required Node.js version was overriden to v$FORCE_NODE_VERSION"
    echo "This could lead to broken functionality, and is unsupported."
    echo "USE AT YOUR OWN RISK!"
  fi
}

install_with_yarn_or_npm() {
  echo "User agent: ${npm_config_user_agent-none}"
  # NOTE@edvincent: We want to keep using the package manager that the end-user was using to install the package.
  # This also ensures that when *we* run `yarn` in the development process, the yarn.lock file is used.
  case "${npm_config_user_agent-}" in
    npm*)
      # HACK: NPM's use of semver doesn't like resolving some peerDependencies that vscode (upstream) brings in the form of pre-releases.
      # The legacy behavior doesn't complain about pre-releases being used, falling back to that for now.
      # See https://github.com//pull/5071
      npm install --unsafe-perm --legacy-peer-deps --omit=dev
      ;;
    yarn*)
      yarn --production --frozen-lockfile --no-default-rc
      ;;
    *)
      echo "Could not determine which package manager is being used to install code-server"
      exit 1
      ;;
  esac
}

vscode_install() {
  echo 'Installing Code dependencies...'
  cd lib/vscode
  install_with_yarn_or_npm

  symlink_asar
  symlink_bin_script remote-cli code code-server
  symlink_bin_script helpers browser browser .sh

  cd extensions
  install_with_yarn_or_npm
}

main "$@"
