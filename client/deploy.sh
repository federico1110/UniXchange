#Build React frontend app
npm run build

# Navigate into the build output directory
cd build 

#Initialize git, add all files, commit and push to GitHub frontend repository
git init
git add -A
git commit -m 'UniXchange app deploy'
git push -f https://github.com/samuelebouveret/samuelebouveret.github.io.git master:gh-pages