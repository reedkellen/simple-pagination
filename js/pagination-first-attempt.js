// GLOBAL VARIABLES
// Store the student-list UL inside a variable to modify contents
const $studentList = $('.student-list');
// Store each student object in the UL 'student-list' inside a variable.
const $students = $('.student-item');
// Get the total number of student objects.
const totalStudents = $students.length;
// Get the number of pages needed.
const studentPages = Math.floor(totalStudents / 10) + 1;
// Assign the page to a variable to append the pagination later.
const $page = $('.page');
// Assign the HTML we'll insert on the page to a variable.
const $paginationHTML = $(`<div class="pagination"></div>`);
// Create an unordered list to hold the pagination items.
const $paginationUL = $(`<ul></ul>`);

// FUNCTIONS
function removeStudents() {
  $students.each(function() {
    $(this).remove();
  });
}

// INITIAL PAGINATION ACTIONS - REMOVE ENTIRE LIST AND DISPLAY THE FIRST 10 STUDENTS.
// Remove all student items from the DOM by iterating through the students array.
removeStudents();
// By default, append the first 10 students in the array back on to the student-list UL.
for (let i = 0; i < 10; i +=1) {
  $studentList.append($students[i]);
};

// PAGINATION FUNCTIONALITY
//  The programming needs to dynamically calculate the number of pages needed, AND add the links to the bottom of the page.  But, only if there are more than 10 students.
if (totalStudents <= 10) {
  $paginationHTML.append(`<p>Full list of students displayed.</p>`);
  $page.append($paginationHTML);
} else {
  for (let i = 1; i <= studentPages; i += 1) {
    $paginationUL.append(`<li><a href="#">` + i + `</a></li>`);
  };
  $paginationHTML.append($paginationUL);
  $page.append($paginationHTML);
}

//The pagination links should work to display their set of 10 students.  Creating an event listener for the page links.
$('.pagination a').on('click', function() {
  // Remove students from the display before displaying a new set.
  removeStudents();
  // Remove the active class from the previously clicked link.
  $('.pagination a').removeClass('active');
  // Add the active class to the link that was clicked.
  $(this).addClass('active');
  // Assign i a value based on the link clicked, that matches the starting array index of a block of 10.  If the link is 1, the i = 0, link is 2, i = 10.
  // Use j as a counter to only list 10 students at a time.
  let i = ($(this).html() - 1) * 10;
  let j = 0;
  do {
    $studentList.append($students[i]);
    i += 1;
    j += 1;
  } while (j < 10);
});

// EXCEEDS EXPECTATIONS SECTION
// Create the HTML for the search field and button
const $studentSearch = $(`
  <div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>
  `);
// Append the search functionality to the header
$('.page-header').append($studentSearch);

const $nothingFoundAlert = $(`
  <div>
    <p>Nothing found, search again.</p>
  </div>
`);

$nothingFoundAlert.slideDown(1000).delay(2000).slideUp(1000);

$studentSearch.append($nothingFoundAlert);
$nothingFoundAlert.hide();

// Adding an event listener to the button in the search field.
$('.student-search button').on('click', function() {
  $nothingFoundAlert.hide();
  // Capture the text from the user search (input field)
  const $searchText = $('.student-search input').val();
  // Clear the list of students on search
  removeStudents();
  // Match the user text to names or emails of students objects - if a match, add to the displayed list.
  $students.each(function() {
    const $studentObject = $(this);
    const $studentName = $studentObject.find('h3').text();
    const $studentEmail = $studentObject.find('.email').text();
    // Looking for partial matches on name or email
    if ($studentName.indexOf($searchText.toLowerCase()) >= 0 || $studentEmail.indexOf($searchText.toLowerCase()) >= 0) {
      $studentList.append($studentObject);
    }
  });
});
