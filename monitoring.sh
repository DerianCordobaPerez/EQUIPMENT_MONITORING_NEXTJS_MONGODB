#!/bin/bash

die () {
   echo >&2 "$@"
   exit 1
}

[ "$#" -eq 2 ] || die "2 argument required, $# provided"

commands=`cat info.json`
ip=$1
command=$2

declare -A specialCommands=(
   ["dhcp"]="cat /etc/dhcp/dhcpd.conf"
   ["dns"]="cat /etc/bind/named.conf.local"
   ["web"]="apache2ctl -S"
   ["snmp"]="snmpget -v1 -c public 192.168.10.1 sysDescr.0"
)

if [ "$command" = "isConnected" ]; then
   ping -c 1 -i 0.2 -w 1 $ip
elif [ -v specialCommands[$command] ]; then
   ssh -n root@$ip "${specialCommands[$command]}"
else
   ssh -n root@$ip `node -pe "JSON.parse(process.argv[1]).commands.$command" "$commands"`
fi