# Theory

# 1.What is node.js

Ans:Node.js is javaScript runtime environment built on the top of Google's V8 Engine by using node.js we can run or excute the javaScript code outside the browser.
we can do so many thing with javaScipt which is not possible before node.js - Accessing FileSystem,better netwoking capabilties.
we can use node.js on the ther server side the of web development. it build fast and highly scalable network application (back-end).

# use case:

- it fast and scalable becouse of single threaded, based on event driven , non blobking I/O model.
- building API with database behind it (preferably NoSQL)
- Data Streaming - Real-time chat application - Server-side chat application

# Not use :

- Application with heavy server-side processing(CPU-intensive) like image manupulation,file compression,video conversion anything like that.

- EJS stands for Embedded JavaScript, and it's a popular templating engine for Node.js. It allows you to embed JavaScript code directly within HTML markup, enabling dynamic content generation on the server-side `{%Placeholder%}`.

- Slugify: it is tools or package.Slugify functions often remove spaces, punctuation, and special characters, convert uppercase letters to lowercase, and replace spaces with hyphens or underscores. It helps improve the SEO (Search Engine Optimization) of a website by making URLs more descriptive and user-friendly.

# Local Dependency:

Local dependencies are packages or modules installed in the current project's directory.
They are typically listed in the dependencies or devDependencies section of the project's package.json file.
Local dependencies are usually required for the project to run or develop, and they are specific to that project.
Examples include libraries like Express.js, React, or lodash that are used in the project.

# Development Dependency (devDependency):

Development dependencies are packages or modules that are only needed during the development phase of a project.
They are also listed in the devDependencies section of the project's package.json file.
Development dependencies include tools like testing frameworks (e.g., Jest, Mocha), bundlers (e.g., Webpack, Parcel), or linters (e.g., ESLint, Prettier).
These dependencies are not required for the production deployment of the project but are necessary for development tasks such as testing, linting, or building the project.

# Global Dependency:

Global dependencies are packages or modules installed globally on your system, rather than within a specific project.
They are typically installed using a package manager like npm or yarn with the -g flag.
Global dependencies are accessible from any project on your system and are not tied to a specific project's directory.
Examples of global dependencies include CLI tools like create-react-app or nodemon, which are used for project scaffolding or development workflows.

# Sementic version

![Semantic Versioning](https://codeforgeek.com/wp-content/uploads/2023/03/major-minor-patch-semantic-versioning.jpg)

# "nodemon": "^2.0.22"

    - 2 is major version,0 is minor version, 22 is patch(fix bug)
    ![Version](https://codeforgeek.com/wp-content/uploads/2023/03/major-minor-patch-semantic-versioning.jpg)

# ~ and ^

    - Using a tilde (~) before the version number of the dependency package means that we will accept only further patch releases from the version specified but will not receive any major or minor release if we were to install or update our dependency package.
    - Using a caret (^) before the version number of the dependency package means that we can accept both patch and minor releases from the version specified but will not receive any major release if we were to install or update our dependency package.
