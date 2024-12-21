## Overview

This project is a URL Shortener application that takes long URLs and generates shorter, more manageable links. The application is designed to be efficient, scalable, and easy to deploy. You can check it out here https://unique-pithivier-303790.netlify.app/

## Features

- Generates shortened URLs using a **polynomial rolling hash function**.
- Ensures **idempotency** by returning the same shortened URL for the same input URL.
- Does not generate unique shortened URLs per user; the same URL will always return the same shortened version for all users.

## Tech Stack

- **Frontend Framework**: React.js
- **State Management**: useState hooks for form control and state updates.
- **HTTP Client**: Axios for API interactions.
- **CSS Framework**: Tailwind CSS for styling.

## User Flow

- **Login**: Authenticated users can generate permanent short URLs.
- **Guest Mode**: Temporary links valid until the 28th of each month.
- **Previous Entries**: Authenticated users can view previously created URLs and descriptions.

## Features Implementation

### Login and Guest Mode
- The app restricts permanent short URL creation to authorized users. Guests can generate temporary links via a "Continue as Guest" option.

### URL Submission
- Form inputs capture long URLs and optional descriptions.
- API integration ensures proper backend communication for URL shortening.

### Table Preview
- The TablePreview component dynamically fetches and displays previously created links for authenticated users.

