function openNewWindow() {
  let currentUrl = window.location.href;
  let newWindow = window.open(currentUrl, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
}