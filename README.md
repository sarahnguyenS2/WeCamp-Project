# WeCamp - Assignment 1

## Introduction
- **NAB Innovation Center Vietnam**
- **Program:** WeCamp batch 2
- **Assessment:** Assignment 1
- **Authors:** Thanh Hao & Hoai Diem
- **Created  date:** 25/03/2023
- **Last modified:** 09/04/2023

## List of requirements and tasks done

### Easy (35 points)
- [x] Feel free to decide the content and structure of your website. (It should have a top navigation bar and footer, and a carousel)
- [x] Basically a land page to sell your product.
- [x] A page must contain a form to collect input from visitors, i.e. comments, queries etc.
- Two pages have the form collect input from users:
  - **Contact page:** Contact form.
  - **Checkout page:** Billing details which get the user information to order product.
- [x] The website must contain at least 5 pages that cover relatively enough information about the topic. For example, about yourself, or about your companies etc.
  - Our website has `8` pages: 
     - Sign up/ Sign in page.
     - Home page.
     - Shop (Product) page.
     - About page.
     - Contact page.
     - Product detail page.
     - Add to cart page.
     - Checkout page.
- [x] Feel free to use any kinds of data (JSON file) or generating themselves using [Mockaroo](https://www.mockaroo.com/) or any sites that you are familiar with.
 - We write an API using JSON-server and deploy it using [Cyclic](https://cyclic.sh/).
    - Source file API: [Product API](https://github.com/sarahnguyenS2/Product-API).
    - Link deploy: https://drab-plum-oyster-hat.cyclic.app

### Medium (20 points)
- [x] A list of product items in one of a page (10 points).
- [x] Click in one of the item in that list, it would redirect to a detailed page of that product (10 points).
 - When you click the detail button on any product, it will redirect to the detail page of that product.

### Hard (15 points)
- [x] A notification to tell the users to accept the page cookies (3 points).
 - Accept cookies notification will appear as soon as you open the home page.
- [x] A nested comment for users to upload their comment (7 points).
 - The comment section is in the last of the product detail page.
- [x] Use any kinds of storage to store the users information in log in. For example: click on the button login and you can hard code the username and store it in local storage or session storage. (2 points)
 - We use the `localStorage` to store the users' information in registration and login.
 - Use `sessionStorage` to store the login email of the user for logout.
- [x] If the user has not logged in yet, they cannot access to a certain pages. Make some of the pages private. (3 points)
 - If you have some products in your cart and you want to buy it, when you clicked the `Checkout` button but you have not logged in yet, then it will redirect to to `login.html` page.
 
 ## Explanation of some pages and functions
 
 ### 1. Product detail page
 - When you click the `detail` button of any product on the `product.html` page, it will redirect to the `details.html` page with the URL having a parameter called `id` which is the id of the product you clicked.
 - In the `details.js` file, the id of the product will be got, and when fetching API, it will render the information followed by that id and inner it into HTML file.
 
 ### 2. Nested comment
 - We use `localStorage` to store the information comment of the users.
 - When the page is loaded, if there have any comment in localStorage, it will be rendered.
  ![image](https://user-images.githubusercontent.com/91973283/230776865-a358fe94-6611-416c-aac9-ef629a1a4bb8.png)
 > <sub> This is the box for the user to input their comment, and when they click the `Add` button the comment will be rendered. (User must fill the username and the content of the comment or the alert of error will appear.) </sub>
 - The comment added by this box is the level 1 comment and put in the `commentList`.
 ![image](https://user-images.githubusercontent.com/91973283/230776900-cf29fc07-f92a-4bf9-a1b3-4fa088ec63dd.png)
 - If you click the button `like` or `dislike` the number of them will increase. 
 ![image](https://user-images.githubusercontent.com/91973283/230776924-b79030cf-7730-482d-ab04-70add0e06d24.png)
 > <sub> If you click the button `reply`, a box similar to the comment box will appear with the `Submit` button. <sub>
 - The comment that was added by this box is the level 2 comment and put in the `childList` with the number in `id` as 0.
- If you more reply comments in the reply box, they'll be put in the `childList` id with the number increase following the level.
 ![image](https://user-images.githubusercontent.com/91973283/230777899-7ce47eee-e345-43ee-8475-dcd9cd9cfb0f.png)

 **The flow of code**
- When the user click the `Add` button, the code will create a new object and save it to localStorage, it includes:
  - `id`: the length of the comment array in the localStorage.
  - `username`: the username that the user input in the `username` field.
  - `content`: the content of the comment that the user input in the box.
  - `like`: the number of users who clicked this button, default when it created is 0.
  - `dislike`: the number of users who clicked this button, default when it created is 0.
  - `lastUpdated`: use `new Date()` function to store the time when it was created.
  - `childrenIds`: the array will store the childList id when the comment has replies.
  - `parentId`: the id of the higher level comment when it is a reply comment.
- After clicking, the page will render the comment on the screen without reloading.
- The level of comment will be divided by their id.

## Drawbacks and bugs in the website
1. In the list of products, it has the `quantity` properly in it. And it may have some products with a quantity is 0, but when you click the `Add to cart` button, it still is added to the cart.
2. If you increase the quantity of product in the `details.html` page, and click `Add to cart` it just adds one product to the cart.
3. The nested comment when you always reply the comment before it, make a pyramid of comment like this:
![image](https://user-images.githubusercontent.com/91973283/230778187-6d40ae13-1591-4535-81eb-e0950c69de9c.png)
4. The performance of the `product.html` page and `details.html` is quite low (maybe a few seconds) because of the API.
