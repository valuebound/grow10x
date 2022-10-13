# Grow10x
## OKR Platform
Tool to track individual & company-wide `Object & Key Results` for the specific organization.

---
### Features
- Individual OKR Track
- Company OKR Track
- Organization Chart View
- Dashboard of OKR Stats
- OKR Activity Track

---
## Authors
- [@Sujeet Brahmankar](https://github.com/sujeetbrahmankar)
- [@Suyash Katoch](https://github.com/suyash-vb)
- [@Joel Vinay Kumat](https://github.com/joel-vb)
- [@Vinay Sawardekar](https://github.com/Vinay-Sawardekar)
- [@Narayan Dubey](https://github.com/narayand-vb)
- [@Atif Kamal](https://github.com/hafizaatifkamal)
- [@Divyanshu Kumar](https://github.com/Divyanshu-0001)
- [@Swapnil Keshav Khedkar](https://github.com/swapnilkhedkar-vb)
- [@Kusuma Sri Lahari](https://github.com/kusuma-vb)
- [@Sachin Nishad](https://github.com/nishad-valuebound)
- [@Adithya Pantangi](https://github.com/Adithya-Pantangi)
- [@Ajay](https://github.com/Ajay-VB-364)

---
## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`, Please raise Issues or PR in the repo.

---
## Documentation

Please find the User Manual here,
[Documentation](https://docs.google.com/document/d/e/2PACX-1vSTfYw-Tjh2hmJPcwFy0ItYqpM5G4ak6oanfQYy2hsesxfasNSc-bUd3M0NtYyxz3ykzAxsQthMurDD/pub)

---
## Register

Make sure to register your company by contacting hello@valuebound.com to access the site.

`URL` : http://valuebound.grow10x.org/

---
### Tech Stack

**Client:** React, Redux, Ant Designs

**Server:** Node, Express

---
## Backend
### Requirements

For Backend development, you will only need Node.js and a node global package, Yarn, installed in your environment.

#### Node
- ##### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- ##### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- ##### Node installation on Mac

  Prerequisites
  brew should be installed on your system. if not download it from [Homebrew's official website](https://brew.sh/) and follow the procedure.

      $ brew install node

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command to check version .

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

#### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn
---
### Code setup & Installation

    $ git clone https://github.com/valuebound/grow10x.git
    $ cd valuebound-okr
    $ cd backend
    $ yarn install
---
### Running the project
#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

    $ yarn start
#### Health Check
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
## Frontend
Make Sure you have installed the yarn.

#### Code setup & Installation

    $ git clone https://github.com/valuebound/grow10x.git
    $ cd valuebound-okr
    $ cd frontend
    $ yarn install

### Running the project
#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_ENV`

    $ yarn start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Runnning the tests`

    $ yarn tests

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Creating build`

    $ yarn build

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---
### Used By

This project is used by the following companies:

- Valuebound

---
### Feedback

If you have any feedback, please reach out to us at hello@valuebound.com

---