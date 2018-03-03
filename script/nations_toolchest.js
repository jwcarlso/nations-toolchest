var nations = [
  "America",
  "Arabs",
  "China",
  "Egypt",
  "Ethiopia",
  "Greece",
  "India",
  "Japan",
  "Korea",
  "Mali",
  "Mongolia",
  "Persia",
  "Poland",
  "Portugal",
  "Rome",
  "Venice",
  "Vikings"
];
var invalidPairs = [
  ["America", "Arabs"],
  ["Ethiopia", "Poland"],
  ["India", "Mali"],
  ["Japan", "Vikings"],
  ["Korea", "Venice"],
  ["Mongolia", "Portugal"],
]

var selectNationsResult = document.querySelector('.selectNationsResult');
var debugResult = document.querySelector('.debugResult');
var playerCountField = document.querySelector('.playerCountField');
var selectNationsButton = document.querySelector('.selectNationsButton');

playerCountField.focus();

function selectNations() {
  var playerCount = Number(playerCountField.value);
  if (playerCount < 1 || playerCount > 5) {
    selectNationsResult.textContent =
        "Please enter a valid player count (1,2,3,4,5)";
    return;
  }
  var randomSelection = getRandom(nations, playerCount);
  var attempts = 1;
  while (!isValid(randomSelection)) {
    attempts++;
    randomSelection = getRandom(nations, playerCount);
  }
  selectNationsResult.textContent = randomSelection.sort();
  debugResult.textContent = "Attempts: " + attempts;
}

selectNationsButton.addEventListener('click', selectNations);

// Borrowed from https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        // uniform selection from remaining elements
        var x = Math.floor(Math.random() * len);
        // either read directly from the array (else case) or follow the "taken" pointer
        result[n] = arr[x in taken ? taken[x] : x];
        // map the "empty space" to either the last element (else case) or to whatever
        // the current taken[len] is pointing to (so that we pick something else
        // for the next value of x)
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function isValid(randomSelection) {
  for (let pair of invalidPairs) {
    if (randomSelection.indexOf(pair[0]) >= 0
        && randomSelection.indexOf(pair[1]) >= 0) {
      return false;
    }
  };
  return true;
}
