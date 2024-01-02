#! /bin/bash

sudo apt-get update
sudo apt-get -y upgrade

bun upgrade
bun update -g

ncu -g ##npm update -g too slow
ncu # manually update if desired