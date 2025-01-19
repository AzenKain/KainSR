@echo off

echo Starting Server...
start cmd /k "npm run start"

echo Starting Proxy...
cd "FireFly.Proxy.v2"
start FireflySR.Tool.Proxy.exe
