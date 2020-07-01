const { ipcRenderer } = require("electron");
const { PythonShell } = require("python-shell");
const path = require("path");

var known_paths = [];
var unknown_paths = [];

const draggedPic = (pagination) => {
  var holder = undefined;
  if (pagination == 1) {
    holder = document.getElementById("drag-file");
  } else {
    holder = document.getElementById("drag-file-unknown");
  }

  if (holder != null) {
    holder.ondragover = () => {
      return false;
    };
    holder.ondragleave = () => {
      return false;
    };
    holder.ondragend = () => {
      return false;
    };

    holder.ondrop = (e) => {
      e.preventDefault();
      for (let f of e.dataTransfer.files) {
        //verifie le type de fichier
        if (f.type == "image/jpeg") {
          const { path } = f;
          show_image(path, pagination);
        } else {
          console.log("pas bon");
          alert("Mauvaise extension de fichier");
        }
      }
    };
  }
};

const show_image = (path, pagination) => {
  var pathsLgth = undefined;
  if (pagination == 1) {
    pathsLgth = known_paths.length;
  } else {
    pathsLgth = unknown_paths.length;
  }
  console.log(pathsLgth);
  if (pathsLgth < 6) {
    var toVerif =
      pagination == 1 ? known_paths.indexOf(path) : unknown_paths.indexOf(path);
    if (toVerif === -1) {
      var counter = document.getElementById("counter");
      if (pagination == 1) {
        known_paths.push(path);
        counter.style.display = "block";
        counter.innerHTML = `${known_paths.length}/5`;
      } else {
        unknown_paths.push(path);
        counter.style.display = "block";
        counter.innerHTML = `${unknown_paths.length}/5`;
      }
      renderNextButton(pagination);

      var img = document.createElement("img");
      img.src = path;
      img.alt = path;
      img.id = path;
      img.onclick = () => {
        removePic(img.id, pagination);
      };
      document.getElementById("img-div").appendChild(img);

      if (pathsLgth == 5) {
        console.log("go to next screen");
      }
    } else {
      alert("Cette photo a déjà été importée !");
    }
  } else {
    alert("Trop de photos !");
  }
};

const removePic = (path, pagination) => {
  const conf = confirm("Voulez vous suprimer cette photo ?");
  if (conf == true) {
    document.getElementById(path).remove();
    var counter = document.getElementById("counter");
    if (pagination == 1) {
      const idx = known_paths.indexOf(path);
      known_paths.splice(idx, 1);
      if (known_paths.length < 1) {
        counter.style.display = "none";
      } else {
        counter.style.display = "block";
        counter.innerHTML = `${known_paths.length}/5`;
      }
    } else {
      const idx = unknown_paths.indexOf(path);
      unknown_paths.splice(idx, 1);
      if (unknown_paths.length < 1) {
        counter.style.display = "none";
      } else {
        counter.style.display = "block";
        counter.innerHTML = `${unknown_paths.length}/5`;
      }
    }
    renderNextButton(pagination);
  }
};

const renderNextButton = (pagination) => {
  var button = undefined;
  var bgText = undefined;
  var whichOne = undefined;
  if (pagination == 1) {
    button = document.getElementById("next-button");
    bgText = document.getElementById("drag-div");
    whichOne = known_paths.length;
  } else {
    button = document.getElementById("next-button-unknown");
    bgText = document.getElementById("drag-div");
    whichOne = unknown_paths.length;
  }

  if (whichOne > 0) {
    button.style.display = "block";
    bgText.style.display = "none";
  } else {
    button.style.display = "none";
    bgText.style.display = "block";
  }
};

const deleteKnowPaths = () => {
  known_paths = [];
};

const nextScreen = (pagination) => {
  if (pagination == 1) {
    ipcRenderer.send("known", known_paths);
    known_paths = [];
  } else {
    ipcRenderer.send("unknown", unknown_paths);
    unknown_paths = [];
  }
};

const askForPythonComputing = () => {
  ipcRenderer.send("start-python", true);
};

const name = (a) => {
  ipcRenderer.send("name", a);
};

ipcRenderer.on("logs", (event, arg) => {
  var a = arg
  for (var i = 0; i < a.length; i++) {
    if (i == 0) {
      document.getElementById("python-log-div").remove()
      var mainDiv = document.createElement("div")
      mainDiv.id = "main-log-div"
      mainDiv.className = "text-div"
      document.body.appendChild(mainDiv)

      var title = document.createElement("h1")
      title.textContent = "Résultats :"
      title.style.fontSize = "x-large"
      title.style.fontWeight = "bolder"
      title.style.paddingBottom = "20px"
      document.getElementById("main-log-div").appendChild(title)

      document.getElementById("progress-bar").remove()
      document.getElementById("title-div").remove()
    }
    var newLog = document.createElement("h3")
    newLog.textContent = a[i]
    newLog.id = a[i]
    document.getElementById("main-log-div").appendChild(newLog)
  }
})

// const runPython = () => {
//   console.log("coucou");
//   var options = {
//     scriptPath: path.join(__dirname, "."),
//     args: [],
//   };

//   PythonShell.run("main.py", options, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// };
