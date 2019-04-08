# Super Clever Lockscreen

## What you need
__TODO: Make script for this below!__

1. **lightdm**:  
  1.1. Install: `sudo apt-get install lightdm`.  
  1.2. Change display manger to lightdm: `sudo dpkg-reconfigure lightdm` (ok and next select *lightdm*).  
2. **lightdm-webkit2-greeter**:  
  2.1 Add repo: `echo 'deb http://download.opensuse.org/repositories/home:/antergos/Debian_9.0/ /' > /etc/apt/sources.list.d/home:antergos.list`.  
  2.2 Update: `apt update`.  
  2.3 And install `apt-get install lightdm-webkit2-greeter`.  
  2.4 Change greeter:  
    - **manually:** Change `greeter-session` in `/etc/lightdm/lightdm.conf` to `lightdm-webkit2-greeter`.
    - **command:** `sed -i "/greeter-session/s/=.*/=lightdm-webkit2-greeter/" /etc/lightdm/lightdm.conf`.


## Instalation
**Before it, check if you have all packages from *all you need section (above).*** Simplest way to applied theme is just run **install.sh** script. Script just copy all files to themes folder and set theme to default (if user wants).