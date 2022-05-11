#!/bin/bash

die () {
   echo >&2 "$@"
   exit 1
}

[ "$#" -eq 2 ] || die "2 argument required, $# provided"

commands=`cat commands.json`
ip=$1
command=$2

declare -A specialCommands=(
   ["dhcp"]="cat /etc/dhcp/dhcpd.conf | grep group -A 100"
   ["dns"]="cat /etc/bind/named.conf.local"
   ["web"]="apache2ctl -S"
   ["snmp"]="snmpget -v1 -c public 192.168.10.1 sysDescr.0"
   ["logs"]="cat /var/log/remote/`ssh -n root@$ip hostname`/rsyslogd.log > ./logs/log - $ip.log"
)

if [ -v specialCommands[$command] ]; then
   "${specialCommands[$command]}"
else
   `node -pe "JSON.parse(process.argv[1]).$command" "$commands"`
fi