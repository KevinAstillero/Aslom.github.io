function validateForm(){
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var year = document.getElementById("year").value;
    var location = document.getElementById("location").value;
    var borrower = document.getElementById("borrower").value;
    var IDnumber = document.getElementById("IDnumber").value;

    if (title === ""){
        alert("Title is required");
        return false;

    }

    if (author === ""){
        alert("Author is required");
        return false;

    }

    if (genre === ""){
        alert("Genre is required");
        return false;

    }


    if (year === ""){
        alert("Year is required");
        return false;

    }
    else if(year < 1950){
        alert("Year must not later than 1950");
        return false;

    }

    if (location === ""){
        alert("Location is required");
        return false;

    }
 
    if (borrower === ""){
        alert("Borrower's Name is required");
        return false;

    }
    if (IDnumber === ""){
        alert("IDnumber is required");
        return false;

    }
    else if(IDnumber < 1){
        alert("Input Required ID number");
        return false;

    }

    return true;

}
function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  var html = "";

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.title + "</td>";
    html += "<td>" + element.author + "</td>";
    html += "<td>" + element.genre + "</td>";
    html += "<td>" + element.year + "</td>";
    html += "<td>" + element.location + "</td>";
    html += "<td>" + element.borrower + "</td>";
    html += "<td>" + element.IDnumber + "</td>";
    html += "<td>" + element.dateAdded + "</td>"; // Display the date of adding data
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';

    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}


window.onload = showData;


function AddData() {
  if (validateForm() == true) {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var genre = document.getElementById("genre").value;
    var year = document.getElementById("year").value;
    var location = document.getElementById("location").value;
    var borrower = document.getElementById("borrower").value;
    var IDnumber = document.getElementById("IDnumber").value;

    var currentDate = new Date().toLocaleDateString(); // Get the current date

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      title: title,
      author: author,
      genre: genre,
      year: year,
      location: location,
      borrower: borrower,
      IDnumber: IDnumber,
      dateAdded: currentDate, // Add the current date to the object
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("year").value = "";
    document.getElementById("location").value = "";
    document.getElementById("borrower").value = "";
    document.getElementById("IDnumber").value = "";
  }
}


function deleteData(index) {
  var peopleList;
  var archiveList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  if (localStorage.getItem("archiveList") == null) {
    archiveList = [];
  } else {
    archiveList = JSON.parse(localStorage.getItem("archiveList"));
  }

  var deletedItem = peopleList[index];
  deletedItem.dateDeleted = new Date().toLocaleString(); // Record the date of deleting the data
  peopleList.splice(index, 1);
  archiveList.push(deletedItem);

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  localStorage.setItem("archiveList", JSON.stringify(archiveList));

  showData();
}


function updateData(index){
    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null){
        peopleList = [];
     } else {
        peopleList= JSON.parse(localStorage.getItem
        ("peopleList"));
     }

         document.getElementById("title").value = peopleList[index].title;
         document.getElementById("author").value= peopleList[index].author;
         document.getElementById("genre").value= peopleList[index].genre;
         document.getElementById("year").value= peopleList[index].year;
         document.getElementById("location").value= peopleList[index].location;
         document.getElementById("borrower").value= peopleList[index].borrower;
         document.getElementById("IDnumber").value= peopleList[index].IDnumber;
    
         document.querySelector("#Update").onclick = function(){
            if(validateForm() == true){
                peopleList[index].title = document.getElementById("title").value;
                peopleList[index].author = document.getElementById("author").value;
                peopleList[index].genre = document.getElementById("genre").value;
                peopleList[index].year = document.getElementById("year").value;
                peopleList[index].location = document.getElementById("location").value;
                peopleList[index].borrower = document.getElementById("borrower").value;
                peopleList[index].IDnumber = document.getElementById("IDnumber").value;


                localStorage.setItem("peopleList", JSON.stringify(peopleList));

                showData();

                document.getElementById("title").value = "";
                document.getElementById("author").value= "";
                document.getElementById("genre").value= "";
                document.getElementById("year").value= "";
                document.getElementById("location").value= "";
                document.getElementById("borrower").value= "";
                document.getElementById("IDnumber").value= "";

                document.getElementById("Submit").style.display="block";
                document.getElementById("Update").style.display="none";
            }
         }
}


//archiving

function showArchive() {
  var archiveList;
  if (localStorage.getItem("archiveList") == null) {
    archiveList = [];
  } else {
    archiveList = JSON.parse(localStorage.getItem("archiveList"));
  }

  var html = "";

  archiveList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.title + "</td>";
    html += "<td>" + element.author + "</td>";
    html += "<td>" + element.genre + "</td>";
    html += "<td>" + element.year + "</td>";
    html += "<td>" + element.location + "</td>";
    html += "<td>" + element.borrower + "</td>";
    html += "<td>" + element.IDnumber + "</td>";
    html += "<td>" + element.dateAdded + "</td>";
    html += "<td>" + element.dateDeleted + "</td>"; // Display the date of deleting data
    html +=
      '<td><button onclick="deleteFromArchive(' +
      index +
      ')" class="btn btn-danger">Delete</button></td>';
    html += "</tr>";
  });

  document.querySelector("#archiveTable tbody").innerHTML = html;
}



window.onload = function() {
  var currentPage = window.location.pathname;
  if (currentPage.includes("archive.html")) {
    showArchive();
  } else {
    showData();
  }

};
  function deleteFromArchive(index) {
    var archiveList;
    if (localStorage.getItem("archiveList") == null) {
      archiveList = [];
    } else {
      archiveList = JSON.parse(localStorage.getItem("archiveList"));
    }
  
    archiveList.splice(index, 1);
    localStorage.setItem("archiveList", JSON.stringify(archiveList));
    showArchive();
  }
  
  
  function downloadTable() {
    var table = document.getElementById("crudTable"); // Replace "crudTable" with the appropriate table ID
  
    // Convert table to CSV format
    var csv = [];
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++) {
      var row = [];
      var cells = rows[i].cells;
      for (var j = 0; j < cells.length; j++) {
        row.push(cells[j].innerText);
      }
      csv.push(row.join(","));
    }
    var csvContent = csv.join("\n");
  
    // Create a temporary link element and set the CSV data as the href
    var link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.download = "Bookrecords.csv"; // Set the desired filename for the downloaded file
  
    // Simulate a click on the link to trigger the download
    link.click();
  }
  
  function downloadArchiveTable() {
    var table = document.getElementById("archiveTable"); // Replace "archiveTable" with the appropriate table ID
  
    // Convert table to CSV format
    var csv = [];
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++) {
      var row = [];
      var cells = rows[i].cells;
      for (var j = 0; j < cells.length; j++) {
        row.push(cells[j].innerText);
      }
      csv.push(row.join(","));
    }
    var csvContent = csv.join("\n");
  
    // Create a temporary link element and set the CSV data as the href
    var link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.download = "archive_table.csv"; // Set the desired filename for the downloaded file
  
    // Simulate a click on the link to trigger the download
    link.click();
  }

  function handleLogin() {
    // Get the entered username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Here, you can add your own logic to validate the username and password
    // For demonstration purposes, let's assume the username is "admin" and the password is "password"

    if (username === "admin" && password === "password") {
        // Set the login status flag in localStorage
        sessionStorage.setItem("isLoggedIn", true);

       

        // Redirect to the homepage (index.html)
        window.location.href = "index.html";

    } else {
        alert("Invalid username or password. Please try again.");
        // Clear the input fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

    
}

function checkLoginStatus() {
  // Check if the user is logged in
  
  if (!localStorage.getItem("isLoggedIn")) {
    // Redirect to the login page
    window.location.href = "login.html";
  }
}

// Check the login status and update the navigation elements accordingly
function updateNavigation() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  // Get the login and logout links from the navigation bar
  var loginLink = document.getElementById("login-link");
  var logoutLink = document.getElementById("logout-link");

  if (isLoggedIn) {
    // User is logged in
    loginLink.style.display = "none"; // Hide the login link
    logoutLink.style.display = "block"; // Show the logout button
  } else {
    // User is not logged in
    loginLink.style.display = "block"; // Show the login link
    logoutLink.style.display = "none"; // Hide the logout button
  }
}

// Add an event listener to the logout button
document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior

  // Clear the login status
  sessionStorage.removeItem("isLoggedIn");

  // Redirect to the login page
  window.location.href = "login.html";
});

// Event listener for the logout link
document.getElementById('logout-link').addEventListener('click', function() {
  // Show the confirmation modal
  $('#confirmationModal').modal('show');
});

// Event listener for the logout confirmation
document.getElementById('confirm-logout-btn').addEventListener('click', function() {
  // Perform logout actions here (clear session, redirect, etc.)
  // ...
  // For demonstration purposes, let's clear the login status flag in localStorage

  localStorage.removeItem('isLoggedIn');

  // Redirect to the login page
  window.location.href = 'login.html';
});

// Check if the user is already logged in
// Redirect to the login page if they are not
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html';
} else {
  // Check if the user is on the login page
  // Redirect to the index page if they are
  if (window.location.href.indexOf('login.html') > -1) {
      window.location.href = 'index.html';
  }
}







  