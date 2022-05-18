#!/bin/bash

source colors.sh
source utilities.sh

declare -A services=(
    ["dhcp"]="isc-dhcp-server"
    ["bind"]="bind9"
    ["snmp"]="snmpd"
    ["apache2"]="apache2"
)

help() {
cat << EOF
Usage: ${0##*/} <ip> [options]
Make use of the commands provided on the offered services you want to back up.

    -h, --help      display this help and exit
    -d, --dhcp      Make a backup copy of the Dhcp service along with its configuration files.
    -D, --dns       Make a backup copy of the DNS service along with its configuration files.
    -s, --snmp      Make a backup copy of the SNMP service along with its configuration files.
    -w, --web       Make a backup copy of the Apache Web service along with its configuration files.
    -a, --all       Make a backup copy of all services along with their configuration files.
EOF
}

backup() {
    echo -e "${UWHITE}Try to backup the ${services[$1]} service...${NC}"

    if ! isServiceInstalled $2; then
        echo -e "${RED}Service ${services[$1]} is not installed on $ip"
    else
        createDirectory ./backup
        createDirectory ./backup/`date +%d-%m-%Y`

        ssh -n root@$ip "tar -czf /root/backupTemp.tar.gz /etc/$2/*"
        scp -r root@$ip:/root/backupTemp.tar.gz ./backup/`date +%d-%m-%Y`/
        ssh -n root@$ip "rm /root/backupTemp.tar.gz"

        if [ $? -eq 0 ]; then
            mv ./backup/`date +%d-%m-%Y`/backupTemp.tar.gz ./backup/`date +%d-%m-%Y`/$1-`date +%d-%m-%Y-%H%M`.tar.gz
            echo -e "${GREEN}Backup of the ${services[$1]} service completed."
        else
            echo -e "${RED}Backup of $1 service failed"
        fi
    fi

    echo ""
}

ip=$1

shift

for option in $@; do
    case $option in
        --help|-h)
            help
            exit 0
            ;;
        --dhcp|-d)
            backup dhcp dhcp
            ;;
        --dns|-D)
            backup "bind" "bind"
            ;;
        --snmp|-s)
            backup snmp snmp
            ;;
        --web|-w)
            backup apache2 apache2
            ;;
        --all|-a)
            for service in "${!services[@]}"; do
                backup $service $service
            done
            ;;
        *)
            echo -e "Unknown option: ${UWHITE}$option${NC}" >&2
            exit 1
            ;;
    esac
done