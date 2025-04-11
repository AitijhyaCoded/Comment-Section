const input = document.querySelector('.enter');
const commentList = document.querySelector('.comment-list');

const create = () => {
    const value = input.value.trim();
    if (value) {
        const comment = document.createElement('div');
        const name = 'Mimi';
        const timeStamp = new Date().toLocaleString();

        comment.className = 'comment';
        comment.innerHTML = `
            <div class="meta"><strong>${name}</strong> • ${timeStamp}</div>
            <div class="text">${value}</div>
            <div class="actions">
                <button onclick="upvote(this)" class="upvote">👍</button>
                <span class="vote-count">0</span>
                <button onclick="downvote(this)" class="downvote">👎</button>
                <button class="reply-btn">Reply</button>
            </div>
            <div class="replies"></div>
        `;

        commentList.appendChild(comment);
        input.value = '';
    }
};

const upvote = (btn) => {
    const voteCount = btn.parentElement.querySelector('.vote-count');
    let count = parseInt(voteCount.textContent);
    voteCount.textContent = count + 1;
};

const downvote = (btn) => {
    const voteCount = btn.parentElement.querySelector('.vote-count');
    let count = parseInt(voteCount.textContent);
    voteCount.textContent = count - 1;
};
