document.addEventListener('DOMContentLoaded', function () {
  // Core elements
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const initialContent = document.getElementById('initial-content');
  const simulationContent = document.getElementById('simulation-content');
  const promptText = document.getElementById('prompt-text');
  const chatHistory = document.querySelector('.chat-history');

  // Shortcuts
  const newChatButton = document.querySelector('.new-chat');
  const searchShortcut = document.querySelector('.search-shortcut');
  const settingsShortcut = document.querySelector('.settings-shortcut');
  const profileShortcut = document.querySelector('.profile-shortcut');

  // Modals & overlay
  const overlay = document.getElementById('overlay');
  const searchModal = document.getElementById('search-modal');
  const quickSearchInput = document.getElementById('quick-search-input');
  const quickSearchGo = document.getElementById('quick-search-go');
  const quickSearchCancel = document.getElementById('quick-search-cancel');

  const settingsModal = document.getElementById('settings-modal');
  const settingsClose = document.getElementById('settings-close');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  const profileModal = document.getElementById('profile-modal');
  const displayName = document.getElementById('display-name');
  const nameInput = document.getElementById('name-input');
  const saveNameBtn = document.getElementById('save-name-btn');
  const profileCancel = document.getElementById('profile-cancel');

  // Toggle button
  const toggleBtn = document.getElementById('toggle-btn');
  let isPlaying = false;

  // Helpers: show/hide modals
  function showModal(modal) {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
  function hideModal(modal) {
    modal.classList.add('hidden');
    if ([searchModal, settingsModal, profileModal]
        .every(m => m.classList.contains('hidden'))) {
      overlay.classList.add('hidden');
    }
  }
  function hideAllModals() {
    [searchModal, settingsModal, profileModal].forEach(m => m.classList.add('hidden'));
    overlay.classList.add('hidden');
  }

  // Add item to chat history (and make it clickable)
  function addToHistory(text) {
    const item = document.createElement('p');
    item.className = 'chat-item';
    item.textContent = text;
    item.title = 'Open this query';
    item.addEventListener('click', () => {
      promptText.textContent = text;
      initialContent.classList.add('hidden');
      simulationContent.classList.remove('hidden');
    });
    chatHistory.appendChild(item);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  // Search handlers
  function runSearchFrom(text) {
    const query = (text || '').trim();
    if (!query) return;

    promptText.textContent = query;
    addToHistory(query);

    searchInput.value = '';
    initialContent.classList.add('hidden');
    simulationContent.classList.remove('hidden');

    hideAllModals();
  }

  function handleSearch() {
    runSearchFrom(searchInput.value);
  }

  // Wire search box (main)
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Toggle Play/Pause
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        console.log('Paused');
        toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
      } else {
        console.log('Playing');
        toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
      }
      isPlaying = !isPlaying;
    });
  }

  // New Chat: reset to initial screen
  newChatButton.addEventListener('click', () => {
    searchInput.value = '';
    promptText.textContent = '';
    simulationContent.classList.add('hidden');
    initialContent.classList.remove('hidden');
    searchInput.focus();
  });

  // Search shortcut: open quick-search modal (works anywhere)
  if (searchShortcut) {
    searchShortcut.addEventListener('click', () => {
      showModal(searchModal);
      quickSearchInput.value = '';
      setTimeout(() => quickSearchInput.focus(), 0);
    });
  }
  quickSearchGo.addEventListener('click', () => runSearchFrom(quickSearchInput.value));
  quickSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runSearchFrom(quickSearchInput.value);
  });
  quickSearchCancel.addEventListener('click', () => hideModal(searchModal));

  // Settings shortcut: open panel
  if (settingsShortcut) {
    settingsShortcut.addEventListener('click', () => showModal(settingsModal));
  }
  settingsClose.addEventListener('click', () => hideModal(settingsModal));
  clearHistoryBtn.addEventListener('click', () => {
    chatHistory.innerHTML = '';
    hideModal(settingsModal);
  });

  // Profile shortcut: open panel to change name
  if (profileShortcut) {
    profileShortcut.addEventListener('click', () => {
      nameInput.value = (displayName.textContent || '').trim();
      showModal(profileModal);
      setTimeout(() => nameInput.focus(), 0);
    });
  }
  saveNameBtn.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    displayName.textContent = newName || 'User';
    hideModal(profileModal);
  });
  profileCancel.addEventListener('click', () => hideModal(profileModal));

  // Close modals by clicking overlay
  overlay.addEventListener('click', hideAllModals);
});
