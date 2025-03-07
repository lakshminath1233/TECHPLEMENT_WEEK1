let courses = [];
let courseList = document.querySelector(".course-list");
let navList = document.querySelector(".nav-btn-list");
let isLoggedIn = localStorage.getItem("isLoggedIn");
let loginbtn = document.getElementById("login");
if (loginbtn) {
  loginbtn.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "yes");
    navButtons();
    window.location.href = "index.html";
    fetchCoursesAndRender();
  });
}

function navButtons() {
  let navbtns = document.createElement("div");
  if (localStorage.getItem("isLoggedIn") === "yes") {
    navbtns.innerHTML = `
      <a class="nav-btn" id="logout" onClick="logout()" href="index.html">Logout</a>
    `;
  } else {
    navbtns.innerHTML = `
      <a class="nav-btn" href="index.html">Home</a>
      <a class="nav-btn" href="login.html">Login</a>
      <a class="nav-btn" href="register.html">Register</a>
      <a class="nav-btn" href="about.html">About</a>
      <a class="nav-btn" href="contact.html">Contact</a>
    `;
  }
  navList.innerHTML = "";
  navList.appendChild(navbtns);
}
navButtons();

function logout() {
  console.log("logout");
  localStorage.setItem("isLoggedIn", "no");
  navButtons();
  window.location.href = "index.html";
  fetchCoursesAndRender();
}

async function fetchCoursesAndRender() {
  const apicall = await fetch("data.json");
  courses = await apicall.json();

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (localStorage.getItem("isLoggedIn") === "yes") {
      courseCard.innerHTML = `
        <img class="course-img" src="${course.courseimg}" alt="${course.coursename}">
        <h3>${course.coursename}</h3>
        <p>${course.coursedesc}</p>
        <div class="price">$${course.price}</div>
        <button class="course-btn" onClick="buy()" >Buy Now</button>
      `;
    } else {
      courseCard.innerHTML = `
        <img class="course-img" src="${course.courseimg}" alt="${course.coursename}">
        <h3>${course.coursename}</h3>
        <p>${course.coursedesc}</p>
        <div class="price">$${course.price}</div>
      `;
    }

    courseList.appendChild(courseCard);
  });
}
fetchCoursesAndRender();

function buy() {
  let notification = document.querySelector(".notification");
  let div = document.createElement("div");
  div.classList.add("notify");
  div.innerHTML = `<p class="success">Successfully Purchased</p>`;
  notification.appendChild(div);
  setTimeout(() => {
      notification.removeChild(div);
  }, 2000);
}
