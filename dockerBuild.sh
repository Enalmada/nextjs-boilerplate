args=""
while IFS= read -r var; do
  # Ignore empty lines and comments
  if [[ ! -z "$var" ]] && [[ ! "$var" =~ ^# ]]; then
    # Encode newlines in the value part
    key=$(echo "$var" | cut -d= -f1)
    value=$(echo "$var" | cut -d= -f2- | sed ':a;N;$!ba;s/\n/\\n/g')
    args="$args --build-arg ${key}=${value}"
  fi
done < <(grep -E -v '^(#|$)' .env.local)

echo $args

docker build $args -t t3-challenge .