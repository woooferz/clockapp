/*if('serviceWorker' in navigator) {
    let registration;
  
    const registerServiceWorker = async () => {
      registration = await navigator.serviceWorker.register('./service-worker.js');
    };
  
    registerServiceWorker();
}*/

var use_12_hour = false;

const convert24hourTo12HourFormat = (time) => {
  const time_part_array = time.split(":");
  let ampm = "AM";
  if (time_part_array[0] >= 12) {
    ampm = "PM";
  }
  if (time_part_array[0] > 12) {
    time_part_array[0] = time_part_array[0] - 12;
  }
  const formatted_time =
    time_part_array[0] +
    ":" +
    time_part_array[1] +
    ":" +
    time_part_array[2] +
    " " +
    ampm;
  return formatted_time;
};

$(document).ready(function () {
  $(".clock .date").css("color", localStorage.getItem("date_color"));
  $(".clock .time").css("color", localStorage.getItem("time_color"));
  $(".staffle").css("color", localStorage.getItem("staffle_color"));
  $(".bg").css("background-color", localStorage.getItem("back_color"));
  $(".link").css("color", localStorage.getItem("staffle_color"));
  use_12_hour = localStorage.getItem("12hour");

  use_12_hour = use_12_hour == "true" ? true : false;
});

window.addEventListener(
  "storage",
  function () {
    $(".clock .date").css("color", localStorage.getItem("date_color"));
    $(".clock .time").css("color", localStorage.getItem("time_color"));
    $(".staffle").css("color", localStorage.getItem("staffle_color"));
    $(".bg").css("background-color", localStorage.getItem("back_color"));
    $(".link").css("color", localStorage.getItem("staffle_color"));

    use_12_hour = localStorage.getItem("12hour");

    use_12_hour = use_12_hour == "true" ? true : false;
  },
  false
);

var intervalId = window.setInterval(function () {
  var date = new Date();

  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();

  seconds = zeroize(seconds);
  minutes = zeroize(minutes);
  hour = zeroize(hour);

  var NoDateTime = hour + ":" + minutes + ":" + seconds;

  var NoTimeDate =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

  if (use_12_hour == true) {
    NoDateTime = convert24hourTo12HourFormat(NoDateTime);
  }

  $(".clock .date").html(NoTimeDate);
  $(".clock .time").html(NoDateTime);
  var text_thing =
    localStorage.getItem("clock_text") == null
      ? "Staffle Clock"
      : localStorage.getItem("clock_text");
  //console.log(NoDateTime)
  $(".staffle").html(
    text_thing +
      ' | <a class="link" href="./settings/" style="color: ' +
      localStorage.getItem("staffle_color") +
      '">Settings</a>'
  );

  $("title").html(NoDateTime + " - SC");
}, 250);

function zeroize(number) {
  return number < 10 ? "0" + number : number;
}
