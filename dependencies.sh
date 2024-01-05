#! /bin/bash

sudo apt-get update
sudo apt-get -y upgrade

bun upgrade
bun update -g

ncu # manually update local deps if desired