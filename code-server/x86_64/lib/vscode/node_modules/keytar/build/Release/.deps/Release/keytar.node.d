cmd_Release/keytar.node := ln -f "Release/obj.target/keytar.node" "Release/keytar.node" 2>/dev/null || (rm -rf "Release/keytar.node" && cp -af "Release/obj.target/keytar.node" "Release/keytar.node")
