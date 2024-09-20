# nodejs-address-book

This project is a Full Stack NodeJS Address Book Application and appeared as the realization of a [NURE](https://nure.ua/) course project task:

> Implement the "Address Book" application. The program should allow entering the full name of the contact, home and work addresses, phone numbers, and additional textual information for each person. The information should be stored on disk as an external file. The application should allow users to view database entries and search by last name, phone number, or address.

## Table of Contents

- [Description](#description)
- [Database Configuration](#database-configuration)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

Let's break it down by each logical part:
- I decided to use JavaScript as the primary language, leveraging its runtime environment NodeJS, and the Express framework for easy server setup.
- For the Frontend, I am using the EJS template engine for dynamic data manipulation, along with vanilla CSS and JavaScript.
- The external database will be stored as a JSON file, which acts as a lightweight and flexible data format.
- The application is built using the MVC (Model-View-Controller) architecture.
- Most importantly, this project offers me a lot of fun and valuable experience!

## Database Configuration

Although this application is not designed to use robust DB clients like MySQL, PostgreSQL, or MongoDB, I still need a way to store contact data. For this, I chose JSON, a simple and efficient solution. The contact data will be stored in a file named [db.json](https://github.com/korichh/nodejs-address-book/blob/main/db.json), located in the root directory of the app.

Each saved contact object will have the following structure:

```json
{
    "id": 1,
    "avatar": "default.webp",
    "fullname": "Студент ХНУРЕ",
    "home": {
        "number": "0999999999",
        "address": "проспект Науки, 14, Харків"
    },
    "work": {
        "number": "",
        "address": ""
    },
    "about": "Перше місце серед технічних університетів України за результатами рейтингу, складеного МОН молоді та спорту України"
}
```

The complete file structure of the app looks like this:

![](https://github.com/korichh/nodejs-address-book/blob/main/images/7-file-structure.png?raw=true)

## Installation

To install this application on your local machine, refer to the [package.json](https://github.com/korichh/nodejs-address-book/blob/main/package.json) file, which includes the following scripts:

- `npm start` - Starts the application.
- `npm run hot` - Watches for file changes and reloads the app in case of errors.
- `npm run ui` - Runs the browser-sync CLI for automatic UI reloading.
- `npm run dev` - Combines `hot` and `ui` for development.

## Usage

Here's how you can use this address book to store and manage contacts:

![](https://github.com/korichh/nodejs-address-book/blob/main/images/1-overview.png?raw=true)
> Overview of the Address Book application.

![](https://github.com/korichh/nodejs-address-book/blob/main/images/2-read.png?raw=true)
> Viewing a contact from the list.

![](https://github.com/korichh/nodejs-address-book/blob/main/images/3-create.png?raw=true)
> Creating a new contact.

![](https://github.com/korichh/nodejs-address-book/blob/main/images/4-edit.png?raw=true)
> Editing an existing contact, for example, when a phone number changes.

![](https://github.com/korichh/nodejs-address-book/blob/main/images/5-delete.png?raw=true)
> Completely deleting a contact.

![](https://github.com/korichh/nodejs-address-book/blob/main/images/6-search.png?raw=true)
> Searching for a contact by name, number, or address.

## License

This project is licensed under the [MIT License](https://github.com/korichh/nodejs-address-book/blob/main/LICENSE).
