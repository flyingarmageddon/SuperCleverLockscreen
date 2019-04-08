#!/bin/bash

THEME_NAME="supercleverlockscreen"

if [ $EUID -ne 0 ]; then
    echo "Warning! You have to run this script as root. Trying to run as root..."
    sudo ./$0
    exit 0
fi

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

while [ true ] ; do
    printf "Do you want to change $THEME_NAME to you current theme? [Y/n] "
    read CHANGE_TO_DEFAULT
    if [ -z "$CHANGE_TO_DEFAULT" ] || [ ${CHANGE_TO_DEFAULT^^} == "YES" ] || [ ${CHANGE_TO_DEFAULT^^} == "Y" ]; then
        sed -i "/webkit_theme/s/= .*/= $THEME_NAME/" /etc/lightdm/lightdm-webkit2-greeter.conf
        break
    elif [ ${CHANGE_TO_DEFAULT^^} == "NO" ] || [ ${CHANGE_TO_DEFAULT^^} == "N" ]; then
        break
    fi
done

echo "Done!"
echo "======================================"


