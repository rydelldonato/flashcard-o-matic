# Flashcard-o-matic: A digital flashcard application

## Overview
Flashcard-o-matic is an application for creating, editing, and deleting digital flashcards and decks of flashcards. Each flashcard has a front and back; the front shows the question, the back shows the answer, and there is a button to flip the card. You can save a series of cards as a deck. This is useful to keep the cards organized by relevance. Cards and decks can be added, modified, and/or deleted.

![home](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/8ad6e17b7d849280a619e4bb69c26baa-home.png)

![create deck](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/c5806a5777aa468623767d8fa4fa8fe8-deck-create.png)

![view deck](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/f63b8bedaaf37cd8c3245febe6f0275f-deck.png)

![study deck](https://res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/e5adaf57aef5e38f4dcd8e7efd0a5dc9-study-first-card.png)

## Installation
Fork & clone the repository. |
---------------------------- |
cd Flashcard-o-matic         |
npm install                  |
npm run start:server         |
npm run start:react          |

## Usage
Once the application and server are running, you can create, edit, and/or delete cards & decks as you see fit. Each deck can be studied, and each card in the deck will have a front and back. I strongly advise having the front of the card ask a question, and the back of the card having the answer. This application was designed with this structure in mind. The back of the card will only be shown when the 'flip' button is clicked.

Once the end of the deck is reached, a prompt will display asking if you would like to restart the deck. You can either restart the deck, or click 'Cancel' to return to the deck list.

## Build Notes
This application was built using React, JavaScript, HTML, Bootstrap for styling, & Jest/React Testing Library for testing.

## Contributions
This application was originally built as part of the curriculum from my time in the full-stack engineering program at [Thinkful](https://www.thinkful.com/).

Please refrain from modifiying these files in this repository.

You are free to create your own repository and edit the files as you see fit.