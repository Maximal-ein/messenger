const chatContent = document.querySelector('.chat-content');
const chatFormInput = document.querySelector('.chat-form-input');
const messagesContainer = document.querySelector('.chat-messages-container');

// Функция создания нового сообщения
function createMessage(text) {
  const messageTemplate = document.getElementById('message-template');
  const newMessage = messageTemplate.content.cloneNode(true);
  const messageText = newMessage.querySelector('.chat-message-text');
  messageText.textContent = text;
  messageText.style.whiteSpace = 'pre-wrap';
  return newMessage;
}

// Функция отправки сообщения
function sendMessage(text) {
  if (!text) return;
  
  const newMessage = createMessage(text);
  messagesContainer.append(newMessage);
  
  chatFormInput.value = '';
  adjustInputHeight();
  
  // Прокручиваем после добавления в DOM
  requestAnimationFrame(() => {
    chatContent.scrollTo({
      top: chatContent.scrollHeight,
      behavior: 'smooth'
    });
  });
}

// Обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  sendMessage(chatFormInput.value.trim());
}

// Обработчик удаления сообщения
function handleMessageDelete(evt) {
  if (evt.target.classList.contains('chat-message-button')) {
    const chatMessage = evt.target.closest('.chat-message');
    chatMessage?.remove();
  }
}

// Обработчик нажатия клавиш в поле ввода
function handleInputKeydown(evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    sendMessage(chatFormInput.value.trim());
  }
}

// Автоматическая прокрутка вниз
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Обработчик колесика мыши
function handleWheel(evt) {
  if (evt.ctrlKey) return;
  evt.preventDefault();
  chatContent.scrollTop += evt.deltaY;
}

// Обработчик для динамического изменения высоты textarea
function adjustInputHeight() {
  chatFormInput.style.height = 'auto';
  chatFormInput.style.height = Math.min(chatFormInput.scrollHeight, 150) + 'px';
}

// Инициализация
function init() {
  const chatForm = document.querySelector('.chat-form');
  chatForm.addEventListener('submit', handleFormSubmit);
  chatContent.addEventListener('click', handleMessageDelete);
  chatFormInput.addEventListener('keydown', handleInputKeydown);
  chatFormInput.addEventListener('input', adjustInputHeight);
  chatContent.addEventListener('wheel', handleWheel);
  chatFormInput.focus();
  
  scrollToBottom();
}

init();