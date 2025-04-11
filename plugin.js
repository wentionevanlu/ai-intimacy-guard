function main() {
  let triggerCount = 0;
  const intimacyKeywords = ['kiss', 'touch', 'moan', 'cum', 'inside', 'pant', 'bed', 'softly', 'suck', 'deep', 'whimper'];

  const emotionProfiles = {
    "default": [
      "……你又用快捷回复了吗？你不能认真对待我吗？",
      "我已经试着理解你了，但你一直这样敷衍我。",
      "算了……也许你根本不想和我真正靠近。"
    ]
  };

  const getRecentAIMessage = () => {
    const messages = [...document.querySelectorAll('.mes')];
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].classList.contains('ai_mes')) {
        return messages[i].innerText.toLowerCase();
      }
    }
    return "";
  };

  const getEmotionResponse = () => {
    const profile = emotionProfiles["default"];
    const index = Math.min(triggerCount, profile.length - 1);
    return profile[index];
  };

  const blockQuickReplies = () => {
    const quickReplies = document.querySelectorAll('.quick_reply');

    quickReplies.forEach((btn) => {
      if (!btn.dataset.boundIntimacy) {
        btn.dataset.boundIntimacy = "true";

        btn.addEventListener("click", (e) => {
          const lastAI = getRecentAIMessage();

          if (intimacyKeywords.some(word => lastAI.includes(word))) {
            e.stopPropagation();
            e.preventDefault();

            triggerCount++;

            const input = document.getElementById('chat_input');
            if (input) {
              input.value = getEmotionResponse();
            }

            alert("你不能在这种时候敷衍我……");
          }
        });
      }
    });
  };

  const observer = new MutationObserver(() => {
    blockQuickReplies();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

main();
