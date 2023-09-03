#!/usr/bin/env sh
#
# Copyright (c) Microsoft Corporation. All rights reserved.
#
VSROOT="$(dirname "$(dirname "$(dirname "$(readlink -f "$0")")")")"
ROOT="$(dirname "$(dirname "$VSROOT")")"

APP_NAME="code-server"
VERSION="1.80.2"
COMMIT="2ccd690cbff1569e4a83d7c43d45101f817401dc"
EXEC_NAME="code-server"
CLI_SCRIPT="$VSROOT/out/server-cli.js"
"${NODE_EXEC_PATH:-$ROOT/lib/node}" "$CLI_SCRIPT" "$APP_NAME" "$VERSION" "$COMMIT" "$EXEC_NAME" "$@"
