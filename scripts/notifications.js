function sendNotification(title, body) {
  var notification = Notification || mozNotification || webkitNotification;

  if (body) {
    var options = {
      body: body
    };
  }

  if (typeof notification === "undefined") {
    console.warn("Web notification not supported");
  } else {
    notification.requestPermission(function(permission) {
      //console.log(Notification.permission);
      if (Notification.permission === "granted") {
        new Notification(title, options);
      }
    });
  }
}
