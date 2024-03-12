let connectedTabs = 0;

function onConnect() {
  connectedTabs++;
  console.log(`A tab connected. Total connected tabs: ${connectedTabs}`);
}

function onDisconnect() {
  connectedTabs--;
  console.log(`A tab disconnected. Total connected tabs: ${connectedTabs}`);
}

self.onconnect = function (event) {
  const port = event.ports[0];
  onConnect();

  port.start();

  port.addEventListener('close', function () {
    onDisconnect();
  });
};
