if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission().then(permission => {
    if (permission !== "granted") {
      alert("Notifications are disabled. Reminders won't work!");
    }
  });
}
function checkReminders() {
  const saved = JSON.parse(localStorage.getItem("fitVitalsReminders"));
  if (!saved) return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  // Medicine Reminder
  if (currentTime === saved.medicineTime) {
    new Notification("💊 Medicine Time!", {
      body: "Take your medicine now.",
      icon: "https://cdn-icons-png.flaticon.com/512/2920/2920362.png"
    });
  }

  // Sleep Reminder
  if (currentTime === saved.sleepTime) {
    new Notification("😴 Sleep Time!", {
      body: "Time to get some rest!",
      icon: "https://cdn-icons-png.flaticon.com/512/3845/3845731.png"
    });
  }
}

// Check every 60 seconds
setInterval(checkReminders, 60000);
let lastWaterTime = null;

function waterReminder() {
  const saved = JSON.parse(localStorage.getItem("fitVitalsReminders"));
  if (!saved) return;

  const now = new Date();

  if (!lastWaterTime || now - lastWaterTime >= 60 * 60 * 1000) {
    if (saved.waterFrequency === "Every 1 hour") {
      new Notification("🚰 Water Reminder!", {
        body: "Time to drink water 💧",
        icon: "https://cdn-icons-png.flaticon.com/512/727/727803.png"
      });
      lastWaterTime = now;
    }
  }
}

setInterval(waterReminder, 60000);
