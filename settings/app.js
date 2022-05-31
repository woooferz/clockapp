function htmlDecode(value) {
  return $("<textarea/>").html(value).text();
}
function htmlEncode(value) {
  return $("<textarea/>").text(value).html();
}

$(document).ready(function () {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let values = params.share;
  let text = params.text;
  if (values === null && text === null) {
    set_defaults();
    load();
  } else if (values === null || text === null) {
    window.location.href = "../settings/";
  } else {
    if (load_share(values, text) == false) {
      window.location.href = "../settings/";
    }
  }
});
function load_share(share, text) {
  try {
    let decoded_share = atob(share);
    let share_list = decoded_share.split("|");
    if (!share_list.length == 5) {
      return false;
    }
    if (!share_list[4].match("^(true|false)$")) {
      return false;
    }
    for (var i = 0; i < share_list.length - 1; i++) {
      if (!share_list[i].match("^#(?:[0-9a-fA-F]{3}){2}$")) {
        return false;
      }
    }

    let text_encoded = htmlEncode(text);

    $("#back_color").val(share_list[0]);
    $("#time_color").val(share_list[1]);
    $("#date_color").val(share_list[2]);
    $("#staffle_color").val(share_list[3]);
    $("#12hour").prop("checked", share_list[4] == "true" ? true : false);

    $("#clock_text").val(text_encoded);

    $(".preview").html(
      "This is a shared theme, you can use this by clicking save below."
    );
  } catch {
    return false;
  }
}

function make_share() {
  let sharecode = btoa(
    $("#back_color").val() +
      "|" +
      $("#time_color").val() +
      "|" +
      $("#date_color").val() +
      "|" +
      $("#staffle_color").val() +
      "|" +
      $("#12hour").prop("checked")
  );

  let textcode = $("#clock_text").val();

  window.location.href =
    "../settings/?share=" + sharecode + "&text=" + textcode;
}

function set_defaults() {
  if (localStorage.getItem("date_color") == null) {
    localStorage.setItem("date_color", "#BBBBBB");
  }

  if (localStorage.getItem("back_color") == null) {
    localStorage.setItem("back_color", "#2F2F2F");
  }

  if (localStorage.getItem("time_color") == null) {
    localStorage.setItem("time_color", "#ECECEC");
  }

  if (localStorage.getItem("staffle_color") == null) {
    localStorage.setItem("staffle_color", "#868686");
  }

  if (localStorage.getItem("12hour") == null) {
    localStorage.setItem("12hour", "false");
  }

  if (localStorage.getItem("clock_text") == null) {
    localStorage.setItem("clock_text", "Staffle Clock");
  }
}
//$('#back_').value('hi');

function load() {
  $("#back_color").val(localStorage.getItem("back_color"));
  $("#time_color").val(localStorage.getItem("time_color"));
  $("#date_color").val(localStorage.getItem("date_color"));
  $("#staffle_color").val(localStorage.getItem("staffle_color"));
  $("#clock_text").val(localStorage.getItem("clock_text"));

  $("#12hour").prop(
    "checked",
    localStorage.getItem("12hour") == "true" ? true : false
  );
}

function save() {
  localStorage.setItem("back_color", $("#back_color").val());
  localStorage.setItem("time_color", $("#time_color").val());
  localStorage.setItem("date_color", $("#date_color").val());
  localStorage.setItem("staffle_color", $("#staffle_color").val());
  localStorage.setItem("12hour", $("#12hour").prop("checked"));
  localStorage.setItem("clock_text", $("#clock_text").val());

  window.location.href = "../settings/";
}

function back() {
  window.location.href = "../";
}

function clearstuff() {
  localStorage.clear();
  set_defaults();
  load();
}
