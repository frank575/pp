let i = 0;

function timedCount() {
  i++;
  postMessage(i);
  setTimeout(timedCount, 3000);
}

timedCount();
