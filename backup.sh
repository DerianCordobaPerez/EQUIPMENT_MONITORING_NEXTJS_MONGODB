#!/bin/bash

source colors.sh
source utilities.sh

backup=`cat info.json`

help() {
cat << EOF
Usage: ${0##*/} <ip> <name> [options]
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
    service=`node -pe "JSON.parse(process.argv[1]).backup.$1" "$backup"`

    echo -e "${UWHITE}Try to backup the $service service...${NC}"

    if ! isServiceInstalled $service; then
        echo -e "${RED}Service $service is not installed on $ip${NC}"
    else
        ssh -n root@$ip "mkdir -p /root/backup/ && cp -r /etc/$2 /root/backup/ >> /dev/null 2>&1"

        if [ $? -eq 0 ]; then
            createDirectory ./backup
            createDirectory ./backup/`date +%d-%m-%Y`
            echo -e "${GREEN}Backup of $service service completed successfully!${NC}"
        else
            echo -e "${RED}Backup of $service service failed!${NC}"
        fi
    fi

    echo ""
}

createBackupTar() {
    echo -e "${UWHITE}Try to create a tar archive...${NC}"

    ssh -n root@$ip "cd /root/backup >> /dev/null 2>&1 && tar -czf /root/backup.tar.gz * >> /dev/null 2>&1"
    scp -r root@$ip:/root/backup.tar.gz ./backup/`date +%d-%m-%Y`/ >> /dev/null 2>&1
    ssh -n root@$ip "rm /root/backup.tar.gz >> /dev/null 2>&1 && if [ -d /root/backup ]; then rm -rf /root/backup; fi >> /dev/null 2>&1"

    if [ $? -eq 0 ]; then
        mv ./backup/`date +%d-%m-%Y`/backup.tar.gz ./backup/`date +%d-%m-%Y`/$pc-`date +%d-%m-%Y-%H%M`.tar.gz
        echo -e "${GREEN}Tar created successfully!${NC}"
    else
        echo -e "${RED}Tar failed!${NC}"
    fi

    echo ""
}

ip=$1
pc=$2

shift 2
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
            backup dhcp dhcp
            backup "bind" "bind"
            backup snmp snmp
            backup apache2 apache2
            ;;
        *)
            echo -e "Unknown option: ${UWHITE}$option${NC}" >&2
            exit 1
            ;;
    esac
done

createBackupTar