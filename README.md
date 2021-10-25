<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/craigmclean39/cv-project-top">
    <img src="readme-images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Resume Creator</h3>

  <p align="center">
    A React based Resume creator utilizing Material UI.
    <br />
    <a href="https://github.com/craigmclean39/cv-project-top"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://craigmclean39.github.io/cv-project-top/">View Demo</a>
    ·
    <a href="https://github.com/craigmclean39/cv-project-top/issues">Report Bug</a>
    ·
    <a href="https://github.com/craigmclean39/cv-project-top/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#libraries-used">Libraries Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
  <img src="readme-images/readme-lightmode.png" alt=""><br>
</p>

<p>
This is a refactor of my first React project created for The Odin Project Full Stack JavaScript curriculum. Initially the project was created with class base components and setState. I've refactored it to use exclusively functional components and hooks. I've created a custom hook, useResume, to handle the loading and editing of the resume. The Resume is stored with the useReducer hook, which is then returned from this useResume hook and updated through the dispatch function. I've also used the latest version of Material UI, v5. I used Dialogs, TextFields, a SpeedDial menu, as well as Buttons, Boxes, Typography, and a host of other components. I also utilized the ThemeProvider system to theme the app in a light and dark mode as well as for setting colors on the resume and providing responsive font sizes.
</p>

### Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://reactjs.org/)
- [MUI v5](https://mui.com/)

### Libraries Used

- [Uniqid](https://www.npmjs.com/package/uniqid)
- [date-fns](https://date-fns.org/)
- [email-validator](https://www.npmjs.com/package/email-validator)
- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://www.npmjs.com/package/jspdf)

<!-- GETTING STARTED -->

## Getting Started

Take a look at the demo <a href="https://craigmclean39.github.io/cv-project-top/">here.</a>

<!-- USAGE EXAMPLES -->

## Features

Resume Creator has the following features:

- Desktop and mobile support.
<p>
  <img src="readme-images/readme-mobile-overview.png" alt=""><img src="readme-images/readme-mobile-form.png" alt="">
</p>

- The user can access a SpeedDial menu to access the options
<p>
<img src="readme-images/readme-speeddial.png" alt="">
</p>
- Add/edit contact details
<p>
  <img src="readme-images/readme-contactform.png" alt="">
</p>
- Add work history
<p>
  <img src="readme-images/readme-workform.png" alt="">
</p>
- Add education history
<p>
  <img src="readme-images/readme-educationform.png" alt="">
</p>
- Add/delete skills
<p>
  <img src="readme-images/readme-skillsform.png" alt="">
</p>
- Customize the color palette of the resume
<p>
  <img src="readme-images/readme-customizeform.png" alt=""><br>
  <img src="readme-images/readme-custom1.png"  alt="">
  <img src="readme-images/readme-custom2.png"  alt="">

</p>
- Editing and Deleting of work/education information is handled with buttons on the generated resume itself.
<p>
  <img src="readme-images/readme-editdelete.png" alt="">
</p>

- The site supports a dark and light mode
<p>
  <img src="readme-images/readme-darkmode.png" alt="">
  <img src="readme-images/readme-lightmode.png" alt="">
</p>

- The resume can be exported as a pdf
<p>
  <img src="readme-images/readme-headerbuttons.png" alt=""><br>
  <img src="readme-images/readme-pdf.png" alt="">
</p>

- The resume, as well as dark/light mode preference is saved in localStorage

<!-- CONTACT -->

## Contact

Craig McLean - craig@craigmclean.dev

Project Link: [https://github.com/craigmclean39/cv-project-top](https://github.com/craigmclean39/cv-project-top)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com/)
- [Google Fonts](https://fonts.google.com/)
