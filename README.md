# PErsonal ASsistant

This is version 1 of Necmettin's Personal Assistant app. All backend and frontend applications regarding the PEAS app are in this repository.

This repository will eventually include all setup scripts and docs.

<hr>

## Projects

Includes one backend application:
- `/server/api`

Also includes a frontend application:
- `/client/panel`

<hr>

## Server preparation

- Here is a one-liner to run the API locally (this is not the optimum way, I (*Necmettin*) suggest running pm2 locally):

	``` shell
	db_name=t4_assessment db_user=root db_password=z uvicorn main:app --reload --port 1234
	```

- Here is the pm2 command line you should use to run the server in development mode:

	```
	cd /home/$USER/website/server/private-api
	pm2 start python3 --name asprivserver --env db_server=localhost --env db_name=t4 --env db_user=t4 --env db_password=t4 --watch="." --watch="../shared" --ignore-watch="node_modules" -- /usr/local/bin/uvicorn main:app --port 1234
	```

- Here is the pm2 command line you should use to run the client in development mode:

	```
	cd /home/$USER/website/client/panel
	pm2 start npm --name asprivclient -- run dev
	```

- Here is the console log command.

	`tail -f ~/.pm2/pm2.log ~/.pm2/logs/*.log /tmp/nginx.log`

- Do not forget these:
	```
	apt install htop
	git config --global credential.helper store
	```
