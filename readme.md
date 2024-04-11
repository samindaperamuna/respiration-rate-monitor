# Respiration Rate Monitor

# Project description

This repository contains source code for both the api and the frontend UI. Front end is done in react.

# Setup project

Clone the repository. You will need a Git client for your operating system.
`git clone git@github.com:samindaperamuna/respiration-rate-monitor.git`

Navigate into the cloned repository.

Run using Maven. You will need a local Maven installation or an IDE such as IntelliJ Idea and open the project in the IDE.

`mvn spring-boot:run`

To run the front-end, navigate into the `respiration-rate-monitor-ui` directory.

You need to have npm installed in the system.

To install libraries
`npm install` 

If you are testing the frontend on a computer, you can run the React server on port 3000.

`npm start`

Make sure you disable Chrome Web Security if you are testing on the same machine. 
Run Chrome browser with arguments: `--disable-web-security`

If you want to build and deploy the HTML and JavaScript run:
`npm run build`

The static files will be located inside the build folder.

If you are running on a network device, replace the server ip with localhost in `DataService.js`.

eg:
`const events = new EventSource("http://192.168.0.6:8080/api/v1/breathingRateSSE");`