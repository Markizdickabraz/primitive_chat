(function () {
    const app = document.querySelector('.app');
    const socket = io();

    let uname;

    const joinUserButton = app.querySelector('.join-screen #join-user');
    const usernameInput = app.querySelector('.join-screen #username');

    joinUserButton.addEventListener('click', function () {
        let username = usernameInput.value;
        if (username.length === 0) {
            return;
        }
        socket.emit('newuser', username);
        uname = username;
        app.querySelector('.join-screen').classList.remove('active');
        app.querySelector('.chat-screen').classList.add('active');
    });

    app.querySelector('.chat-screen #send-message').addEventListener('click', function () {
        let messageInput = app.querySelector('.chat-screen #message-input');
        let message = messageInput.value.trim();
        if (message.length === 0) {
            return;
        }
        renderMessage('my', { username: uname, text: message });
        socket.emit('chat', { username: uname, text: message });
        messageInput.value = '';
    });

    app.querySelector('.chat-screen #exit-chat').addEventListener('click', function () {
        socket.emit('exituser', uname);
        window.location.href = window.location.href;
    });

    socket.on('update', function (update) {
        renderMessage('update', update);
    });

    socket.on('chat', function (message) {
        renderMessage('other', message);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector('.chat-screen .messages');
        let el = document.createElement('div');

        if (type === 'my') {
            el.classList.add('message', 'my-message');
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if (type === 'other') {
            el.classList.add('message', 'other-message');
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if (type === 'update') {
            el.classList.add('update');
            el.innerText = message;
        }

        messageContainer.appendChild(el);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();
