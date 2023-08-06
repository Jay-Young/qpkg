@echo off
setlocal
set ROOT_DIR=%~dp0..\..\..\..
set VSROOT_DIR=%~dp0..\..
call "%ROOT_DIR%\node.exe" "%VSROOT_DIR%\out\server-cli.js" "code-server" "1.75.1" "441438abd1ac652551dbe4d408dfcec8a499b8bf" "code-server.cmd" %*
endlocal
