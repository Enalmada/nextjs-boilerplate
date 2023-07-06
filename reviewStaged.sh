# https://medium.com/@samho1996/how-do-i-make-use-of-chatgpt-to-review-my-code-33efd8f42178
# Get the paths of the staged .js, .ts, .jsx, .tsx files inside ./src
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^(./src/)?.*\.(ts|js|jsx|tsx)$')

# Call the comment script for each staged file
for file in $files
do
  echo "Reviewing $file"
  npm run review $file
done
