# LinkShare

## Overview
LinkShare is an application where the users can gather all their social media links and  personal details and share them all together to other people,like a personal digital card. 
LinkShare can be used from a developer or any other people that wants to share their digital presence with ease.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install the required dependencies(both in client and server folder):
 npm install


## Usage

1. Navigate and start the development server using the following commands:
 LinkShare/server
 npm start

2. Navigate and start the react application using the following commands:
 /LinkShare/client
 npm start


3. Access the LinkShare component in your browser at `http://localhost:3000` or the appropriate URL.

## Features
Users can:
- Add,edit and delete their preferable social links either from predifined options with a dropdown list or with a custom option of their choice.
- Choose a profile image from their destop/laptop or phone and upload to the profile section. This image will be uploaded to Cloudinary's media library.
- Add first name, last name and email to the profile details.
- Send to the server and a connected Mongo DB database when saves both the profile details and links.
- See all the profile details(profile image, full name and email) in the preview page
- Copy the url of the preview page to be able to send their digital information to anyone
- Go to the social link they want by clicking on them
- See animations of specific ui elements when the page loads to catch their attention
- See popups when profile details are saved and when the preview url is copied and alerts when they are about to delete links or logout


## Technologies

The project uses the following technologies:

- MERN stack: Mongo DB with mongoose, Node.js, Express.js and React for building the full stack application.
- React Router: A routing library for React applications.
- Axios: A library for making HTTP requests.
- Cloudinary: A cloud service for media management
- Custom CSS library: A custom library with css variables and classes for apply to the jsx elements.





  





