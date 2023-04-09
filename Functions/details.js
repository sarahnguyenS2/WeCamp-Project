/*
  NAB Innovation Center Vietnam
  Program: WeCamp batch 2
  Assessment: Assignment 1
  Authors: Hao Nguyen
  Created  date: 04/04/2023
  Last modified: 09/04/2023
  Acknowledgement: https://github.com/aroraayush/nested-comments-html
*/

var searchParams = new URLSearchParams(window.location.search);

const productApi = `https://drab-plum-oyster-hat.cyclic.app/products/${searchParams.get(
  "id"
)}`;
const productContainer = document.querySelector(".product");
const addToCartButton = document.querySelector("button.add-to-cart");
let product;
fetch(productApi)
  .then((res) => res.json())
  .then((data) => {
    product = data;
    htmls = `
        <div class="product-image">
            <img src="${product.img}" alt="">
        </div>

        <div class="product-info">
            <h3>${product.title}</h3>
            <div class="rating">
                <div class="text-left">
                    <span>5.0</span>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="text-middle">
                    <span class="number">100</span>
                    <span class="text">Rating</span>
                </div>
                <div class="text-right">
                    <span class="number">500</span>
                    <span class="text">Sold</span>
                </div>
            </div>

            <div class="price">
                <h2>$${product.price}</h2>
            </div>

            <div class="description">
                <p>${product.description}</p>
            </div>

            <div class="input-group">
                <select name="size" id="size" class="size-control">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <div class="quantity">
                    <input type="button" value="-" class="descrease-btn buttons">
                    <input type="text" name="quantity" id="quantity" value="1" min="1">
                    <input type="button" value="+" class="increase-btn buttons">
                </div>
                <p class="amount">${product.quantity} available</p>
                <button type="submit" class="add-to-cart" onclick="addToCart()">Add to cart</button>
            </div>
        </div> 
        `;
    productContainer.innerHTML = htmls;
    //increase/decrease quantity
    const value = document.getElementById("quantity");
    let count = 0;
    const quantityBtn = document.querySelectorAll(".buttons");
    quantityBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const styles = e.currentTarget.classList;
        if (styles.contains("descrease-btn")) {
          if (count <= 1) {
            count = 1;
          } else {
            count--;
          }
        } else {
          count++;
        }
        value.value = count;
      });
    });
  });

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === product.id);
  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    const newProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      img: product.img,
    };
    cart.push(newProduct);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Nested comment
document.addEventListener("DOMContentLoaded", () => {
  if (commentArr.length) {
    renderComments();
  }

  const addButton = document.getElementById("add-comment");
  addButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const content = document.getElementById("comment").value;
    addComment(username, content, null);
  });

  const commentsList = document.getElementById("commentsList");
  commentsList.addEventListener("click", (event) => {
    const { target } = event;

    if (target.nodeName === "A" || target.nodeName === "BUTTON") {
      const parts = target.id.split("-");
      const type = parts[0];
      const id = parts[parts.length - 1];
      const replyId = target.id.split("reply-")[1];

      if (type === "reply" && !document.getElementById("addreply-" + replyId)) {
        const inputElem = `
          <li id="input-${replyId}">
            <div class="comment-input-row">
              <div>
                <input type="text" placeholder="Username" id="username-${replyId}" class="name-username" />
              </div>
            </div>
            <div>
              <textarea rows="5" id="content-${replyId}" class="comment-box" placeholder="Your reply...."></textarea>
              <div>
                <button id="addreply-${replyId}" class="add-btn">Submit</button>
              </div>
            </div>
          </li>
        `;

        const childListElemId = `childlist-${target.id.split("reply-")[1]}`;
        let childListElem = document.getElementById(childListElemId);

        if (!childListElem) {
          childListElem = `<ul id="${childListElemId}"> ${inputElem} </ul>`;
          document.getElementById(`comment-${replyId}`).innerHTML += childListElem;
        } else {
          childListElem.innerHTML = inputElem + childListElem.innerHTML;
        }
      } else if (type === "addreply") {
        const content = document.getElementById(`content-${replyId}`).value;
        const username = document.getElementById(`username-${replyId}`).value;
        addComment(username, content, id);
      } else if (type === "like" || type === "dislike") {
        commentArr[id][type]++;
        renderComments();
        storeComments();
      }
    }
  });
});

// Initialize the comment array
let commentArr = [];

// Function to load comments from local storage
const commentsString = localStorage.getItem("commentArr");
if (commentsString) {
  commentArr = JSON.parse(commentsString)
  commentArr.map((comment) => {
    return {
      ...comment,
      lastUpdated: new Date(comment.lastUpdated),
      like: parseInt(comment.like),
      dislike: parseInt(comment.dislike),
      childrenIds: JSON.stringify(comment.childrenIds)
    }
  })
}

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-comment");
  const commentsList = document.getElementById("commentsList");

  // Render comments if they exist in the commentArr
  if (commentArr.length) {
    renderComments();
  }

  // Add event listener to the comments list
  commentsList.addEventListener("click", (event) => {
    const target = event.target;
    const id = target.id.split("-").pop();

    if (target.nodeName === "A" || target.nodeName === "BUTTON") {
      if (target.id.startsWith("reply-")) {
        // Add reply input field
        const replyId = target.id.split("reply-")[1];
        const childListElemId = `childlist-${replyId}`;
        const childListElem = document.getElementById(childListElemId);

        const inputElem = `
          <li id="input-${replyId}">
            <div class="comment-input-row">
              <div>
                <input type="text" placeholder="username" id="username-${replyId}" class="name-username" />
              </div>
            </div>
            <div>
              <textarea rows="5" id="content-${replyId}" class="comment-box" placeholder="Your reply...."></textarea>
              <div>
                <button id="addreply-${replyId}" class="add-btn">Submit</button>
              </div>
            </div>
          </li>
        `;

        if (childListElem == null) {
          const childListElem = `<ul id="${childListElemId}">${inputElem}</ul>`;
          document.getElementById(`comment-${replyId}`).innerHTML +=
            childListElem;
        } else {
          childListElem.innerHTML = inputElem;
        }
      } else if (target.id.startsWith("addreply-")) {
        // Add reply comment
        const content = document.getElementById(`content-${id}`).value;
        const username = document.getElementById(`username-${id}`).value;
        addComment(username, content, id);
      } else if (
        target.id.startsWith("like") ||
        target.id.startsWith("dislike")
      ) {
        // Update like/dislike
        commentArr[id][target.id] += 1;
        renderComments();
        storeComments();
      }
    }
  });
});

// Function to store comments in local storage
const storeComments = () => {
  const val = JSON.stringify(commentArr);
  localStorage.setItem("commentArr", val);
};

// Function to render a comment
const renderComment = (comment) => {
  const { id, username, content, like, dislike, lastUpdated, childrenIds } = comment;
  const childList = childrenIds.length
    ? `<ul id="childlist-${id}" class="replyList">${childrenIds
        .map((childId) => renderComment(commentArr[childId]))
        .join("")}</ul>`
    : "";
  return `
    <li id="comment-${id}" class="comment">
      <div class="comment-header">
        <div class="comment-username">
          ${username}
      </div>
      <div class="time">
        <span>posted ${timeAgo(lastUpdated)}</span>
      </div>
    </div> 
    <div class="comment-content">
      <span>${content}</span>
    </div>
    <div class="votes">
      <span>${like} <a role="button" id="like-${id}" class="like">Like</a></span>
      <span>${dislike} <a role="button" id="dislike-${id}" class="dislike">Dislike</a></span>
      <a role="button" id="reply-${id}">Reply</a>
    </div>
    ${childList}
  </li>`;
};

// Function to render comments
const renderComments = () => {
  const rootComments = commentArr.filter((comment) => !comment.parentId);
  const commentList = rootComments
    .map((comment) => renderComment(comment))
    .join("");
  document.getElementById("commentsList").innerHTML = commentList;
};

// Function to add a new comment
const addComment = (username, content, parentId) => {
  if (!username || !content) {
    alert("Please enter a username and comment!");
    return;
  }
  const newComment = {
    id: commentArr.length,
    username,
    content,
    like: 0,
    dislike: 0,
    lastUpdated: new Date(),
    childrenIds: [],
    parentId,
  };
  if (parentId !== null) {
    commentArr[parentId].childrenIds.push(newComment.id);
  }
  commentArr.push(newComment);
  storeComments();
  renderComments();
  document.getElementById("comment").value = ""
};

const createComment = (
  id,
  username,
  content,
  like,
  dislike,
  parentId
) => ({
  id,
  username,
  content,
  lastUpdated: new Date(),
  like,
  dislike,
  childrenIds: [],
  parentId,
});

const toJSONString = (comment) =>
  JSON.stringify({
    id: comment.id,
    username: comment.username,
    content: comment.content,
    like: comment.like,
    dislike: comment.dislike,
    lastUpdated: comment.lastUpdated,
    parentId: comment.parentId,
    childrenIds: comment.childrenIds,
  });

const timeAgo = (date) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 12 * MONTH;

  const diff = Math.abs(new Date() - new Date(date));
  if (diff >= YEAR)
    return `${Math.floor(diff / YEAR)} year${diff >= 2 * YEAR ? "s" : ""} ago`;
  if (diff >= MONTH)
    return `${Math.floor(diff / MONTH)} month${
      diff >= 2 * MONTH ? "s" : ""
    } ago`;
  if (diff >= DAY)
    return `${Math.floor(diff / DAY)} day${diff >= 2 * DAY ? "s" : ""} ago`;
  if (diff >= HOUR)
    return `${Math.floor(diff / HOUR)} hour${diff >= 2 * HOUR ? "s" : ""} ago`;
  if (diff >= MINUTE)
    return `${Math.floor(diff / MINUTE)} minute${
      diff >= 2 * MINUTE ? "s" : ""
    } ago`;
  return "a few seconds ago";
};
