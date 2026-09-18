# Book API

## About the project

Book API is a school project built at Medieinstitutet, developed as a group assignment focused on API development and secure user handling. The project consists of a REST API backend built with Node.js, Express and TypeScript, connected to a MongoDB database, along with a client.

The team of three split the work into three areas of responsibility: user management and authentication (Isabelle), book management (Elena & Emil), and review management (Emil). Development covered secure user handling — including registration, login, session management via JWT stored in HTTP-only cookies, and role-based access control for an admin panel — alongside full CRUD functionality for books and reviews.

## Technologies

**💻 Development & Backend**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-0A0A0A.svg?style=for-the-badge&logo=Express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-F04D35.svg?style=for-the-badge&logo=Mongoose&logoColor=white)

**🔐 Authentication & Security**

![Json Web Token](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white) ![Bcrypt](https://img.shields.io/badge/bcrypt-338?style=for-the-badge)
![HTTP-only cookies](https://img.shields.io/badge/HTTP--Only_Cookies-lightgrey?style=for-the-badge)

**🛠️ Tools & Quality**

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Lighthouse](https://img.shields.io/badge/Lighthouse-success?style=for-the-badge&logo=lighthouse&logoColor=white)


**🚀 Version Control & Deployment**

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![GitHub Desktop](https://img.shields.io/badge/GitHub%20Desktop-ffffff?style=for-the-badge&logo=github%20desktop&logoColor=red)


**Developed by:**

[Elena Holmberg](https://github.com/elenaholmberg), 
 [Karl Emil Lychnell](https://github.com/elychnell),
[Isabelle Reynolds](https://github.com/isabelletherese)

## Features

- User registration and login with hashed passwords (bcrypt)
- Session handling via JWT stored in secure, HTTP-only cookies
- Role-based access control (admin vs. regular user)
- Admin panel for managing users, with edit and delete functionality
- Book management (CRUD), publicly readable, admin-only write access
- Review management (CRUD), publicly readable and postable, admin-only for editing and deleting
- Input sanitization to prevent XSS in the admin interface

## Screenshots

**Desktop**
<img src = "docs/screenshots/desktop.png">

**Tablet**
<img src = "docs/screenshots/tablet.png">

**Mobile**
<img src = "docs/screenshots/mobile.png">

## Accessibility: 

### W3C HTML Validator

![HTML validation result from W3C HTML Validator](docs/screenshots/w3c_html_validator.png)
### Lighthouse – desktop
![Accessibility analysis in Chrome Lighthouse, desktop](docs/screenshots/lighthouse_desktop.png)

### Lighthouse – mobile
![Accessibility analysis in Chrome Lighthouse, mobile](docs/screenshots/lighthouse_mobile.png)

## API Overview

**Auth**
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |
| GET | `/api/auth/status` | Public |

**Users**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/users` | Admin |
| GET | `/api/users/:id` | Admin |
| PATCH | `/api/users/:id` | Admin |
| DELETE | `/api/users/:id` | Admin |

**Books**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/books` | Public |
| GET | `/api/books/:id` | Public |
| POST | `/api/books` | Admin |
| PATCH | `/api/books/:id` | Admin |
| DELETE | `/api/books/:id` | Admin |

**Reviews**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/reviews` | Public |
| GET | `/api/reviews/:id` | Public |
| POST | `/api/reviews` | Public |
| PATCH | `/api/reviews/:id` | Admin |
| DELETE | `/api/reviews/:id` | Admin |