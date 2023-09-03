@echo off
setlocal
set ROOT_DIR=%~dp0..\..\..\..
set VSROOT_DIR=%~dp0..\..
call "%ROOT_DIR%\node.exe" "%VSROOT_DIR%\out\server-cli.js" "code-server" "1.80.2" "2ccd690cbff1569e4a83d7c43d45101f817401dc" "code-server.cmd" %*
endlocal
