// GLOBAL VARIABLES
const $allStudents = $('.student-item');

// MAIN FUNCTIONS
// showPage: This smaller function displays a "page" or a list of ten students based which "page number" the user selected.
function showPage(pageNumber, studentList) {
  // First hide all students on the page
  $allStudents.hide();
  // Create index start and end points based on the page number value, to list the appropriate students.  The start value has to be 0, 10, 20, and so on.
  const indexStart = (pageNumber -1) * 10;
  const indexEnd = indexStart + 10;
  // Then loop through all students in our student list argument
  // if student should be on this page number
  // show the student
  studentList.each(function() {
    // Only students inside the specific range should be displayed, filtered by their index() value.
    if (indexStart <= $(this).index() && $(this).index() < indexEnd) {
      $(this).show();
    };
  });
 }

// appendPageLinks: This function creates the links to the different "pages" or lists of students. It will call the showPage
//   function to display the proper list of students based on which link the user clicks. For example, clicking the link to page 1,
//   tells the showPage function to display the first 10 students.
function appendPageLinks(studentList) {
  // determine how many pages for this student list
  const totalStudents = studentList.length;
  const studentPages = Math.floor(totalStudents / 10) + 1;
  // create a page link section
  const $paginationHTML = $(`<div class="pagination"><ul></ul></div>`);
  // “for” every page
  // add a page link to the page link section
  for (let i = 1; i <= studentPages; i += 1) {
    $paginationHTML.append(`<li><a href="#">` + i + `</a></li>`);
  };
  // remove the old page link section from the site
  $('.pagination').remove();
  // append our new page link section to the site
  $('.page').append($paginationHTML);
  // define what happens when you click a link
     // Use the showPage function to display the page for the link clicked
     // mark that link as “active”
  $('.pagination a').on('click', function() {
  // Remove the active class from the previously clicked link.
  $('.pagination a').removeClass('active');
  // Add the active class to the link that was clicked.
  $(this).addClass('active');
    showPage($(this).text(), studentList);
  });
}

function searchList() {
  // Obtain the value of the search input
  const $searchText = $('.student-search input').val();
  // remove the previous page link section
  // $('.pagination').remove();
  // Loop over the student list, and for each student…
    // ...obtain the student’s name…
    // ...and the student’s email…
    // ...if the search value is found inside either email or name…
  let matches = 0;
  console.log('Matches pre loop are: ' + matches);
  $allStudents.each(function() {
    const $studentObject = $(this);
    const $studentName = $studentObject.find('h3').text();
    const $studentEmail = $studentObject.find('.email').text();
    // Looking for partial matches on name or email
    if ($studentName.indexOf($searchText.toLowerCase()) >= 0 || $studentEmail.indexOf($searchText.toLowerCase()) >= 0) {
      // ...add this student to list of “matched” student
      console.log($studentName);
      matches += 1;
    };
  });
  console.log('Matches post loop are: ' + matches);
  // If there’s no “matched” students…
         // ...display a “no student’s found” message
  // If over ten students were found…
         // ...call appendPageLinks with the matched students
 // Call showPage to show first ten students of matched list
}

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

// EXECUTION
// Calling the showPage function to initially display the first page of students with the full list selected.
showPage(1, $allStudents);
// Calling the appendPageLinks function to initially display the page links for all students in the list.
appendPageLinks($allStudents);

// // Create an event listener on the search button
// $('.student-search button').on('click', function() {
//   searchList();
// });
