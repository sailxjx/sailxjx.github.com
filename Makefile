default:

deploy:
	bower install && gulp && msg=`git log -1 --pretty=%B` && cd public && git add --all && git commit -am "$${msg}" && git push

.PHONY: deploy
