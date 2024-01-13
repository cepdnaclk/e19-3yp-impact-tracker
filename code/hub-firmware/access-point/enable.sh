sudo cp uncomment /etc/dhcpcd.conf

# Restart dhcpcd service
sudo service dhcpcd restart

# Restart dnsmasq and hostapd
sudo systemctl restart dnsmasq
sudo systemctl restart hostapd

echo "Configuration completed - access point disabled"

