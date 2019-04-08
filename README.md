# Super Clever Lockscreen

## What you need
__TODO: Make script for this below!__

1. **lightdm**:  
  1.1. Install: `sudo apt install lightdm`.  
  1.2. Change display manger to lightdm: `sudo dpkg-reconfigure lightdm` (ok and next select *lightdm*).  
2. **lightdm-webkit2-greeter**:  
  2.1 Add repo: `sudo echo 'deb http://download.opensuse.org/repositories/home:/antergos/Debian_9.0/ /' > /etc/apt/sources.list.d/home:antergos.list`.  
  2.2 Update: `sudo apt update`.  
  2.3 And install `sudo apt install lightdm-webkit2-greeter`.  
  2.4 Change greeter:  
    - **manually:** Change `greeter-session` in `/etc/lightdm/lightdm.conf` to `lightdm-webkit2-greeter`.
    - **command:** `sudo sed -i "/greeter-session/s/=.*/=lightdm-webkit2-greeter/" /etc/lightdm/lightdm.conf`.
3. **ONLY FOR VIDEO BACKGROUND SUPPORT:**:  
  3.3 Install `sudo apt install libwebkitgtk-3.0-0 gstreamer1.0-libav gstreamer1.0-plugins-bad`


## Instalation
**Before it, check if you have all packages from *all you need section (above).*** Simplest way to applied theme is just run **install.sh** script. Script just copy all files to themes folder and set theme to default (if user wants).