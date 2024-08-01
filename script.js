function showModal(imgSource, heading, description) {
    let d = document.getElementById("display");
    let e = document.getElementById("contents");
    e.style.overflow = "auto";
    document.addEventListener('mousemove', displayFollowCursor);
    d.style.display = "block";
    d.innerHTML = "<div id = 'wrapper'><img id = 'imgid' src = '" + imgSource + "'>" + "<p id='place'>" + heading + "</p>" + "<p id='details'>" + description + "</p></div>";
}

function displayFollowCursor(event) {
    let a = document.getElementById('display');
    const modalWidth = a.offsetWidth;
    const modalHeight = a.offsetHeight;
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const viewportHeight = 1459;

    // Adjust position to make sure the modal is fully visible near the cursor
    let leftPos = cursorX + 20; // 20px offset to the right of cursor
    let topPos = cursorY - modalHeight - 210; // 20px offset above the cursor

    // Check if the modal goes beyond the viewport boundaries
    if (leftPos + modalWidth > window.innerWidth) {
        leftPos = window.innerWidth - modalWidth;
    }
    if (topPos < 0) {
        topPos = 0;
    } else if (topPos + modalHeight > viewportHeight) {
        topPos = viewportHeight - modalHeight - 20; // 20px offset from the bottom of the viewport
    }

    a.style.left = leftPos + "px";
    a.style.top = topPos + "px";
}

function removeModal(){
    let a = document.getElementById("display");
    let b = document.getElementById("contents");
    a.removeAttribute('style');
    b.removeAttribute('style');
    document.removeEventListener('mousemove', displayFollowCursor);
    a.removeChild(a.childNodes[0]);
}

function convertCoords(originalCoords) {
    const originalWidth = 2434;
    const originalHeight = 1459;
    const resizedWidth = document.getElementById('map').clientWidth;
    const resizedHeight = document.getElementById('map').clientHeight;
  
    const areas = document.querySelectorAll('map area');
    for (const area of areas) {
      const coordsString = area.coords;
      const originalCoordsArray = coordsString.split(',').map(Number);
      const widthScaleFactor = resizedWidth / originalWidth;
      const heightScaleFactor = resizedHeight / originalHeight;
      const convertedCoordsArray = [];
  
      for (let i = 0; i < originalCoordsArray.length; i += 2) {
        const x = originalCoordsArray[i];
        const y = originalCoordsArray[i + 1];
  
        convertedCoordsArray.push(Math.floor(x * widthScaleFactor));
        convertedCoordsArray.push(Math.floor(y * heightScaleFactor));
      }
  
      area.coords = convertedCoordsArray.join(',');
    }
  }

convertCoords(null);