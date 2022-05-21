createDirectory() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}Created $1 directory${NC}"
    fi
}

isServiceInstalled() {
    if ssh -n root@$ip "service $1 status" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

isConnectionNetwork() {
    if ssh -n root@$1 "ping -c 1 8.8.8.8" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}