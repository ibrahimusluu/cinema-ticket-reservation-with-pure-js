const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.getElementById("amount");
const select = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  //   spread

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  //   [1,3,5]
  console.log(selectedSeatsArr);
  console.log(seatsArr);
  let selectedSeatIndexes = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  console.log(selectedSeatIndexes);

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;

  let price = select.value;
  amount.innerText = selectedSeatCount * price;

  saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(indexes) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexes));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
