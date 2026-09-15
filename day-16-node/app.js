const config = require("./config");

console.log("================================");
console.log("Application:", config.appName);
console.log("Port:", config.port);
console.log("================================");

function getTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Learn Node.js",
          completed: false,
        },
        {
          id: 2,
          title: "Practice async/await",
          completed: true,
        },
      ]);
    }, 1000);
  });
}

async function startApp() {
  try {
    console.log("Loading tasks...");

    const tasks = await getTasks();

    console.log("Tasks received:");
    console.log(tasks);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

startApp();