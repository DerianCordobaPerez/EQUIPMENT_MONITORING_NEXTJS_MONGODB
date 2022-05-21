#!/bin/bash

source colors.sh
source utilities.sh

servicesJson=`cat info.json`

help() {
cat << EOF
Usage: ${0##*/} <ip> <directory> <name> [options]
Use the commands provided in the offered services that you want to restore.

    -h, --help      display this help and exit
    -d, --dhcp      Restores a copy of the DHCP service along with its configuration files.
    -D, --dns       Restores a copy of the DNS service along with its configuration files.
    -s, --snmp      Restores a copy of the SNMP service along with its configuration files.
    -w, --web       Restores a copy of the Apache Web service along with its configuration files.
    -a, --all       Restores a copy of all services along with their configuration files.
EOF
}

restoreBackup() {
    service=`node -pe "JSON.parse(process.argv[1]).services.$1" "$servicesJson"`
    echo -e "${UWHITE}Try to restore the $service service...${NC}\n"

    if ! isConnectionNetwork $ip; then
        echo -e "${RED}Connection to $ip failed.${NC}"
        exit 1
    fi

    if ! isServiceInstalled $service; then
        echo -e "\n${RED}Service $service is not installed on $ip${NC}\nIt will be installed for proper operation."
        echo -e "${UWHITE}Try to install $service service...${NC}"
        ssh -n root@$ip "apt-get install -y $service" > /dev/null 2>&1

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Service $service installed successfully!${NC}"
        else
            echo -e "${RED}Service $service installation failed!${NC}"
            exit 1
        fi
    fi

    scp -r ./backup/$directory/$backupFile root@$ip:/root >> /dev/null 2>&1
    ssh -n root@$ip "cd /root && tar -zxvf $backupFile -C /etc $1/ && rm /root/$backupFile" > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Restore of $service service completed successfully!${NC}"
    else
        ssh -n root@$ip apt purge --auto-remove $service > /dev/null 2>&1
        echo -e "${RED}Restore of $service service failed!${NC}"
    fi
}

ip=$1
directory=$2
backupFile=$3

shift 3

for option in "$@"; do
    case $option in
        -h|--help)
            help
            exit 0
            ;;
        -d|--dhcp)
            restoreBackup dhcp
            ;;
        -D|--dns)
            restoreBackup "bind"
            ;;
        -s|--snmp)
            restoreBackup snmp
            ;;
        -w|--web)
            restoreBackup web
            ;;
        -a|--all)
            restoreBackup dhcp
            restoreBackup "bind"
            restoreBackup snmp
            restoreBackup web
            ;;
        *)
            echo -e "${RED}Invalid option!${NC}"
            help
            exit 1
            ;;
    esac
done