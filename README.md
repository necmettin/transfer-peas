# assessment-v2

This is version 2 of the Assessment app. All backend and frontend applications regarding the Assessment app are in this repository.

This repository will eventually include all setup scripts and docs.

<hr>

## Projects

Includes three backend applications:
- `/server/private-api`
- `/server/public-api`
- `/server/testing-api`

Also includes two frontend applications
- `/client/testing`
- `/client/panel`

### Private API

This is the backend for the panel used by T4Analytics personnel.
- Written in FastAPI
- Currently uses MySQL database

### Public API

This is currently an empty project, in idea phase. Our customers may need a panel to manage their customers.

### Testing API

This project will be used only by the attendee-testing application.

### Testing Client

This is the frontend that will run when an attendee is answering questions.

### Panel Client

This will be the frontend for the panel.

<hr>

## Important notes

- Each project shall have its own login routes. Routes must never be shared even if they have the exact same code.
- All projects will share the same structures in their group (i.e. backend projects will all be similar).

## Server preparation

- Here is a one-liner to run Private API locally (this is not the optimum way, I (*Necmettin*) suggest running pm2 locally):

	``` shell
	db_name=t4_assessment db_user=t4 db_password=t4 uvicorn main:app --reload --port 1234
	```

- Here is the p2m command line you should use to run the server in development mode:

	```
	cd /home/$USER/website/server/private-api
	pm2 start python3 --name asprivserver --env db_server=localhost --env db_name=t4_assessment --env db_user=t4 --env db_password=t4 --watch="." --watch="../shared" --ignore-watch="node_modules" -- /usr/local/bin/uvicorn main:app --port 1234
	```

- Here is the p2m command line you should use to run the client in development mode:

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

## Shared folders

- Since all backend projects are written in FastAPI; helpers, constants and models will be shared in `/server/shared`.
- Similarly, all frontend projects will be written using the same technologies, so their shared files should be in `/client/shared`.

## Technologies

- Server-side
	- FastAPI (why? incredible development speed)
	- PostgreSQL (why? incredible performance, opensource and free)
- Client-side
	- Svelte (why? incredible development speed)
	- Sveltestrap (why? smallest css size - materialui is 1800k, sveltestrap is 300k)
