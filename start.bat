@echo OFF
node -v 2> Nul
if "%errorlevel%" == "9009" (
    echo Node.js could not be found, please install Node.js at https://nodejs.org/en/download/ and run start.bat again
    timeout /t 30000 /nobreak > NUL
) else (
    timeout /t 5
)
call cd /d %~dp0
call npm i discord.js-selfbotbypass
call npm i chalk
call npm i console-read-write
call npm i find
call npm i read-text-file
call npm i hwid
call npm i ip
call npm i sleep-promise
call npm i nthline
call npm i download-file
call npm i randomstring
call npm i date-and-time
timeout /t 1 /nobreak > NUL
start cmd.exe -c /k node .
