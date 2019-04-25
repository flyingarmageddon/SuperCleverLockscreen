#!/bin/bash

source assets/bash/utils.sh

MODE=0

if [ $EUID -ne 0 ]; then
    echo "Warning! You have to run this script as root. Trying to run as root..."
    sudo ./$0 $1
    exit 0
fi

if [ $# -gt 0 ] && [ $1 == "-p" ]; then
    MODE=1
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

if [ $MODE == 0 ]; then
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
elif [ $MODE == 1 ]; then
    sed -i "/webkit_theme/s/= .*/= $THEME_NAME/" /etc/lightdm/lightdm-webkit2-greeter.conf
    echo -e "${COLOR_RED}Press Ctrl+C to exit preview mode and back to previous settings${COLOR_NONE}"
    echo -e "${COLOR_RED}Press Ctrl+C to exit preview mode and back to previous settings${COLOR_NONE}"
    echo -e "${COLOR_RED}Press Ctrl+C to exit preview mode and back to previous settings${COLOR_NONE}"
    lightdm-webkit2-greeter
    #TODO: Grab old theme name
    sed -i "/webkit_theme/s/= .*/= litarvan/" /etc/lightdm/lightdm-webkit2-greeter.conf
fi

echo "Done!"
echo "======================================"


