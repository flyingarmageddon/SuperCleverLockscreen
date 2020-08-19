# Super Clever Lockscreen
Super Clever Lockscreen is a linux lockscreen based on [lightdm-webkit2-greeter](https://github.com/Antergos/web-greeter). **Online demo available [here](https://flyingarmageddon.gitlab.io/supercleverlockscreen/)**!

Key features:
- multiple backgrounds,
- support for video backgrounds,
- ~~weather forecast~~ (in progress),
- easy-to-use installer.

Note: lockscreen is still in dev :)


## Installation & use
### Requirements

1. **lightdm**:  
  If you are using debian then you probably already have it.  
  1.1. Install: `sudo apt install lightdm`.  
  1.2. Change display manger to lightdm: `sudo dpkg-reconfigure lightdm` (ok and next select *lightdm*).  

2. **lightdm-webkit2-greeter**:  
  2.1 Install using [this instruction](https://software.opensuse.org/download.html?project=home:antergos&package=lightdm-webkit2-greeter).  
  2.2 Change greeter:
    - **quick way**: execute these commands:
    ```
      sudo sed -i "/greeter-session/s/=[.*]/=lightdm-webkit2-greeter/" /etc/lightdm/lightdm.conf && \
      sudo sed -i '/#greeter-session/s/^#//g' /etc/lightdm/lightdm.conf
    ```
    - **manual way**:
      - Uncomment and change `greeter-session` in `/etc/lightdm/lightdm.conf` to `lightdm-webkit2-greeter`.

3. **Video support add-on**:  
  Video support required additional packages to be installed (available in debian 8 & 9 repos).
  3.3 Install `sudo apt install libwebkitgtk-3.0-0 gstreamer1.0-libav gstreamer1.0-plugins-bad`


### Installation
**Before it, check whether if you have all packages from *requirements (above).*** Simplest way to apply theme is to run **install.sh** script. Script will just copy all files to themes folder and set theme to default (based on user selection).

### Usage
Theme should be applied after reboot. If something went wrong and you are not able to
log in - change terminal by [Ctrl]+[Alt]+[Number] and comment out `greeter-session` in `/etc/lightdm/lightdm.conf`. This is propably the easiest way to be able log in again.