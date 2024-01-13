#!/bin/bash

# Install required software
sudo apt update
sudo apt install dnsmasq hostapd iptables-persistent -y

# Stop dnsmasq and hostapd
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd

# Configure static IP address for wlan0
sudo cat <<EOL >> /etc/dhcpcd.conf
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
EOL

# Restart dhcpcd
sudo service dhcpcd restart

# Configure DHCP server (dnsmasq)
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo cat <<EOL >> /etc/dnsmasq.conf
interface=wlan0
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
EOL

# Start dnsmasq
sudo systemctl start dnsmasq

# Configure access point host software (hostapd)
sudo cat <<EOL >> /etc/hostapd/hostapd.conf
country_code=LK
interface=wlan0
ssid=impax
channel=9
auth_algs=1
wpa=2
wpa_passphrase=impax12345678
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP CCMP
rsn_pairwise=CCMP
EOL

# Update hostapd configuration file location
sudo sed -i 's|#DAEMON_CONF=|DAEMON_CONF="/etc/hostapd/hostapd.conf"|' /etc/default/hostapd

# Enable and start hostapd
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd

# Enable routing and IP masquerading
sudo sed -i '/#net.ipv4.ip_forward=1/s/^#//' /etc/sysctl.conf
sudo sysctl -p

# Add firewall rule for masquerading
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Save firewall rules
sudo netfilter-persistent save

echo "Configuration completed."
