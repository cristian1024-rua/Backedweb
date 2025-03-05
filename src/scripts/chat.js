document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChat");
 
    // Conectar con el servidor WebSocket
    const socket = new WebSocket("ws://localhost:8080");
 
    // Evento al recibir mensajes del servidor
    socket.onmessage = (event) => {
        const message = document.createElement("p");
        message.textContent = event.data;
        chatContainer.appendChild(message);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
    };
 
    // Evento al enviar un mensaje
    sendChatBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            socket.send(message);
            chatInput.value = ""; // Limpiar input
        }
    });
 
    // Permitir enviar mensaje con la tecla "Enter"
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendChatBtn.click();
        }
    });
});
 