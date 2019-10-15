build:
	@echo "----------------------------------------------------------------"
	@echo "Update of sin3dlauncher image"
	@echo "----------------------------------------------------------------"
	docker build --no-cache . --tag sin3dlauncher
	@echo "----------------------------------------------------------------"
	@echo "Image is now build you can run instance using 'make run'"
	@echo "----------------------------------------------------------------"

run: 
	@echo "----------------------------------------------------------------"
	@echo "Process to run new instance"
	@echo "----------------------------------------------------------------"
	docker-compose up
	@echo "----------------------------------------------------------------"
	@echo "Your docker instance is now launched with name 'sin3dlauncherinst'"
	@echo "Your website is now accessible at http://localhost:8000"
	@echo "----------------------------------------------------------------"

stop:
	@echo "----------------------------------------------------------------"
	@echo "Process to stop current instance"
	@echo "----------------------------------------------------------------"
	docker stop sin3dlauncherinst
	@echo "----------------------------------------------------------------"
	@echo "App is now stopped"
	@echo "----------------------------------------------------------------"

remove:
	@echo "----------------------------------------------------------------"
	@echo "Process to stop current instance"
	@echo "----------------------------------------------------------------"
	docker stop sin3dlauncherinst
	docker rm sin3dlauncherinst
	@echo "----------------------------------------------------------------"
	@echo "App is now stopped and removed"
	@echo "----------------------------------------------------------------"

clean: 
	@echo "----------------------------------------------------------------"
	@echo "Process to remove image"
	@echo "----------------------------------------------------------------"
	docker rmi sin3dlauncher
	@echo "----------------------------------------------------------------"
	@echo "sin3dlauncher image is now deleted"
	@echo "----------------------------------------------------------------"

deploy: build run
