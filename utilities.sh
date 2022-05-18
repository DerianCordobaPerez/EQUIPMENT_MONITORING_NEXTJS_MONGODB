createDirectory() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}Created $1 directory${NC}"
    fi
}

isServiceInstalled() {
    if ssh root@$ip "service $1 status" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}