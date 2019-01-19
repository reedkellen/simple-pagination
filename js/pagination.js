// GLOBAL VARIABLES
// Query the document and save variables for the page, page header, student list, and an array of student list items.
const studentListUL = document.querySelector('.student-list');
const studentArray = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');

// Create a variable for the "active" student list, that will be used for the showPage and appendPageLinks functions, and the click event listener.
let activeStudentList = studentArray;

// Create variables for the pageLinks HTML and Search HTML.
const pageLinksDiv = createPaginationDiv();
page.appendChild(pageLinksDiv);
const pageLinksUL = createPaginationUL();
pageLinksDiv.appendChild(pageLinksUL);
const studentSearchDiv = createStudentSearchDiv();
pageHeader.appendChild(studentSearchDiv);

// Create a variable for the "no results" search message and add to the page.
const noResultsMessage = createNoResultsMessage();
page.appendChild(noResultsMessage);

// GLOBAL FUNCTIONS
// Creates the HTML for the no search results message.
function createNoResultsMessage() {
    const noResultsMessageDiv = document.createElement('div');
    const noResultsMessageP = document.createElement('p');
    noResultsMessageP.textContent = 'No results found!';
    noResultsMessageDiv.appendChild(noResultsMessageP);
    return noResultsMessageDiv;
}

// Hides the no search results message.
function hideNoResultsMessage() {
  noResultsMessage.style.display = 'none';
}

// Shows the no search results message.
function showNoResultsMessage() {
  noResultsMessage.style.display = '';
}

// Hides students in the desired list so that only a portion are displayed.
function hideStudents(studentList) {
  studentList.forEach(student => student.style.display = 'none');
}

// Creates the pagination div element.
function createPaginationDiv() {
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  return paginationDiv;
}

// Creates the pagination UL
function createPaginationUL() {
  const paginationUL = document.createElement('ul');
  return paginationUL;
}

// Creates pagination list items and anchor elements.
function createPaginationLI(pageNumber) {
  const paginationLI = document.createElement('li');
  const paginationAnchor = document.createElement('a');
  paginationAnchor.setAttribute('href', '#');
  paginationAnchor.textContent = pageNumber;
  paginationLI.appendChild(paginationAnchor);
  return paginationLI;
}

// Creates a search area
function createStudentSearchDiv() {
  const studentSearch = document.createElement('div');
  studentSearch.classList.add('student-search');

  const studentSearchInput = document.createElement('input');
  studentSearchInput.setAttribute('placeholder', 'Search for students...');
  studentSearch.appendChild(studentSearchInput);

  const studentSearchButton = document.createElement('button');
  studentSearchButton.textContent = 'Search';
  studentSearch.appendChild(studentSearchButton);

  return studentSearch;
}

// Removes old pagination links by querying the document.
function removePageLinks() {
  const oldPageLinks = document.querySelectorAll('a');
  for (let i = 0; i < oldPageLinks.length; i += 1) {
    pageLinksUL.removeChild(oldPageLinks[i].parentNode);
  };
}

// PRIMARY FUNCTIONS
/*
This function takes a page number and student list.  Then it does the following:
  1) Hides all students on the list by default
  2) Sets the low index value of the student array based on the page number parameter
  3) Sets the high index value of the student array based on the low index lowIndexValue
  4) Compares whether the highIndexValue is higher than the last item in the array, and if so, changes the highIndexValue to match the array.
  5) Displays the students between the low and high index values.
*/
function showPage(pageNumber, studentList) {
  hideStudents(studentList);
  const lowIndexValue = (pageNumber - 1) * 10;
  let highIndexValue = lowIndexValue + 9;
  if (studentList.length < highIndexValue) {
    highIndexValue = studentList.length -1;
  }
  for (let i = lowIndexValue; i <= highIndexValue; i += 1) {
    studentList[i].style.display = '';
  }
}

/*
This function creates pagination links based on the number of students in a given list. It will:
  1) Calculate the total number of students.
  2) Determine the number of pages needed (allowing for 10 per page).
  3) Add LI elements to the pagination UL for each page needed if there are more than 10 students.
*/
function appendPageLinks(studentList) {
  const totalStudents = studentList.length;
  if (totalStudents > 10) {
    const totalPages = (totalStudents / 10) + 1;
    for (let i = 1; i <= totalPages; i +=1) {
      pageLinksUL.appendChild(createPaginationLI(i));
    };
  };
}

/*
  This function takes user input (from the search field) and compares it to the names and emails of the students in the array.  It does the following:
    1) Hides the no results message.
    2) Saves the input from the user in a variable.
    3) Creates an empty array for students that match the search string.
    4) Finds the name and email of each student, and compares the search string to it.  If there is a match, it adds the student to the new array.
    5) Sets the activeStudentList to the search Array.
    6) Hides the full list of students.
    7) Removes the pagination links.
    8) If there are matches, they are shown with the showPage and appendPageLinks functions.
    9) If there aren't, the failed search message displays.
*/
function searchList(userInput) {
  hideNoResultsMessage();
  const searchString = userInput.value;
  let searchArray = [];
  studentArray.forEach(student => {
    const studentName = student.firstElementChild.firstElementChild.nextElementSibling.textContent;
    const studentEmail = student.firstElementChild.lastElementChild.textContent;
    if (studentName.indexOf(searchString.toLowerCase()) !== -1 || studentEmail.indexOf(searchString.toLowerCase()) !== -1) {
      searchArray.push(student);
    };
  });
  activeStudentList = searchArray;
  hideStudents(studentArray);
  removePageLinks();
  if (searchArray.length > 0) {
    showPage(1, searchArray);
    appendPageLinks(searchArray);
  } else {
    showNoResultsMessage();
  };
};

// EVENT LISTENERS
window.addEventListener('load', () => {
  showPage(1, activeStudentList);
  appendPageLinks(activeStudentList);
  hideNoResultsMessage();
});

pageLinksUL.addEventListener('click', () => {
  const pageNumber = event.target.textContent;
  const pageLinks = document.querySelectorAll('a');
  pageLinks.forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
  showPage(pageNumber, activeStudentList);
});

const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');
searchButton.addEventListener('click', () => {
  searchList(searchInput);
});
