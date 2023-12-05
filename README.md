# go-animal-repo
This project is a re-write of my animal-repo but in Go, with the intent to be ran locally and accessed as a dashboard via browser. It will drop the need for accounts as it will be ran locally, and will serve as a simple way to keep track of your animals. It is not intended to store sensitive data so authentication is not required.

I will be using this to practice some Go further. It will cover database handling, web server to serve the dashboard, and some basic HTML/CSS/JS for the dashboard itself. I will be trying to implement some javascript to make the dashboard more dynamic, but I am not sure how far I will go with this, as I am not a web developer and I have very little experience with JS.

## Stack

- Go
- SQLite
- HTML/CSS/JS

## Setup

Just run the executable corresponding to the OS you are using and it will do the rest, including opening the dashboard in your default browser!

(NOTE: Make sure you do not move files around, the executable must remain in the root folder of the project)

## Backing up data

As the application will look for a set database in the db folder, you can simply copy and rename it to create a backup. You can also use the backup feature in the dashboard.

## Main Features

- [ ] Design dashboard
- [ ] Add animal
- [ ] Edit animal
- [ ] Delete animal

## Optional Extras (May not come, depending on my time)

- [ ] Backup/export data
- [ ] Import data
- [ ] Customise dashboard theme
