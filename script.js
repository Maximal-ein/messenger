const chatContent = document.querySelector('.chat-content');
const chatFormInput = document.querySelector('.chat-form-input');

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
  if (text === '') return;
  
  const messagesContainer = document.querySelector('.chat-messages-container');
  const newMessage = createMessage(text);
  messagesContainer.append(newMessage);
  
  chatFormInput.value = '';
  chatFormInput.style.height = 'auto';
  
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

function scrollToBottom() {
  const messagesContainer = document.querySelector('.chat-messages-container');
  messagesContainer?.scrollIntoView({
    block: 'end',
    behavior: 'smooth'
  });
}

// Обработчик колесика мыши
chatContent.addEventListener('wheel', (evt) => {
  if (evt.ctrlKey) return;
  evt.preventDefault();
  chatContent.scrollTop += evt.deltaY;
}, { passive: false });

//Обработчик для динамического изменения высоты textarea
chatFormInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

// Автоматическая прокрутка при инициализации
function init() {
  const chatForm = document.querySelector('.chat-form');
  chatForm.addEventListener('submit', handleFormSubmit);
  chatContent.addEventListener('click', handleMessageDelete);
  chatFormInput.addEventListener('keydown', handleInputKeydown);
  chatFormInput.focus();
  
  scrollToBottom();
}

init();