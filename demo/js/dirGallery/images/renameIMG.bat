@echo off
setlocal enabledelayedexpansion
set count=0
set str=cat_
for /f %%i in ('dir /b *.jpg') do (
    set /a count+=1
    echo 改名：%%i !str!!count!
    rename %%i !str!!count!.jpg
)