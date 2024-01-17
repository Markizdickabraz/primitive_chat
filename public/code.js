(function () {
    const app = document.querySelector('.app');
    const socket = io();

    let uname;

    const joinUserButton = app.querySelector('.join-screen #join-user');
    const usernameInput = app.querySelector('.join-screen #username');

    joinUserButton.addEventListener('click', function () {
        let username = usernameInput.value;
        if (username.length == 0) {
            return;
        }
        socket.emit('newuser', username);
        uname = username;
        app.querySelector('.join-screen').classList.remove('active');
        app.querySelector('.chat-screen').classList.add('active');
    });

    app.querySelector('.shat-screen #send-message').addEventListener('click', function () {
        let message = app.querySelector('.shat-screen #message-input').value;
    })
})();
