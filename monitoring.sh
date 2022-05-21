#!/bin/bash

die () {
   echo >&2 "$@"
   exit 1
}

#["read"]="if [ -f ./logs/logs- $ip.log ]; then cat ./logs/logs - $ip.log; else cat /var/log/remote/`ssh -n root@$ip hostname`/rsyslogd.log; fi"


[ "$#" -eq 2 ] || die "2 argument required, $# provided"

commands=`cat info.json`
ip=$1
command=$2

declare -A specialCommands=(
   ["dhcp"]="cat /etc/dhcp/dhcpd.conf"
   ["dns"]="cat /etc/bind/named.conf.local"
   ["web"]="apache2ctl -S"
   ["snmp"]="snmpget -v1 -c public 192.168.10.1 sysDescr.0"
   ["logs"]="cat /var/log/remote/`ssh -n root@$ip hostname`/rsyslogd.log > ./logs/log - $ip.log"
)

if [ -v specialCommands[$command] ]; then
   ssh -n root@$ip "${specialCommands[$command]}"
else
   ssh -n root@$ip `node -pe "JSON.parse(process.argv[1]).commands.$command" "$commands"`
fi