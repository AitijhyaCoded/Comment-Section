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
                <button class="upvote">👍</button>
                <span class="vote-count">0</span>
                <button class="downvote">👎</button>
                <button class="reply-btn">Reply</button>
            </div>
            <div class="replies"></div>
        `;

        const upvoteBtn = comment.querySelector('.upvote');
        const downvoteBtn = comment.querySelector('.downvote');
        const voteCount = comment.querySelector('.vote-count');
        let count = 0;

        upvoteBtn.addEventListener('click', () => {
            count++;
            voteCount.textContent = count;
        });

        downvoteBtn.addEventListener('click', () => {
            count--;
            voteCount.textContent = count;
        });

        commentList.appendChild(comment);
        input.value = '';
    }
};
