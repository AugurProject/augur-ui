#!/bin/bash

# make sure ipfs is installed
command -v ipfs >/dev/null 2>&1 || { echo >&2 "IPFS is required to run this command.  Aborting."; exit 1; }

# run init just in case ipfs has never been run
ipfs init > /dev/null 2>&1

if [ $# -lt 1 ]
then
  echo "Usage : $0 <command>"
  exit
fi

case "$1" in

  show)
    ipfs add -r -Q build
    ;;
  publish)
    ipfs pin add --recursive build
    ;;
  *)
    echo 'command not implemented'
    exit 1
    ;;

esac
