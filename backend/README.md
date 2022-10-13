# Grow10x Backend
All the API's supported to Grow10x can be found here.

---
### Authors
- [@Sujeet Brahmankar](https://github.com/sujeetbrahmankar)
- [@Suyash Katoch](https://github.com/suyash-vb)
- [@Vinay Sawardekar](https://github.com/Vinay-Sawardekar)
- [@Kusuma Sri Lahari](https://github.com/kusuma-vb)
- [@Sachin Nishad](https://github.com/nishad-valuebound)
- [@Ajay](https://github.com/Ajay-VB-364)
---
### Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environment.

#### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on Mac

  Prerequisites
  brew should be installed on your system. if not download it from [Homebrew's official website](https://brew.sh/) and follow the procedure.

      $ brew install node
- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
#### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

#### Code setup & Installation

    $ git clone https://github.com/valuebound/grow10x.git
    $ cd okr-portal-backend
    $ yarn install
---
#### Running the Backend Server
##### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

    $ yarn start

##### Health Check
To check whether the Server is Running or not.

Go on this Link: `{{HOST}}/api/health-check`

If Everything is fine then it will give response like this:
```
{
    "uptime":1929.764260473,
    "message":"Ok",
    "timestamp":1664268484124
}
```
---
