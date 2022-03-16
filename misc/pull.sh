#! /usr/bin/env bash
branch="$1"
branch=${branch:-develop}
if [ ! -d "/home/$USER/website" ]
then
	git clone git@github.com:T4Analytics/assessment-v2.git /home/$USER/website
fi
cd /home/$USER/website
git fetch
git pull
git checkout $branch
git fetch
git reset --hard origin/$branch
git pull
git clean -f
