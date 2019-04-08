#!/bin/bash

THEME_NAME="supercleverlockscreen"

echo "======================================"
echo "$THEME_NAME - Installer"
echo "======================================"
echo "Starting..."


mkdir -p /usr/share/lightdm-webkit/themes/$THEME_NAME
echo "Created theme folder in /usr/share/lightdm-webkit/themes/"
cp -r ./ /usr/share/lightdm-webkit/themes/$THEME_NAME/
echo "Copied files from this folder to theme folder"
chmod -R 755 /usr/share/lightdm-webkit/themes/$THEME_NAME
echo "Changed privileges to 755"
echo "Done!"
echo "======================================"