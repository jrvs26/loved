let heartClickCount = 0;
let heartCount = 0;

function createHeart() {
    if (heartCount >= 11) return;

    const heart = document.createElement('img');
    heart.src = 'heart.png';
    heart.classList.add('bubble');

    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 2;
    const randomScale = Math.random() * (2.5 - 1) + 1;

    const randomSize = Math.random() * (60 - 30) + 30;
    heart.style.width = `${randomSize}px`;
    heart.style.height = `${randomSize}px`;

    heart.style.left = `${randomLeft}%`;
    heart.style.animationDelay = `${randomDelay}s`;
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
    heart.style.transform = `scale(${randomScale})`;

    document.body.appendChild(heart);
    heartCount++;

    heart.addEventListener('click', () => {
        heartClickCount++;
        if (heartClickCount > 3) {
            showModal();
        }

        heart.classList.add('popped');
        heart.addEventListener('animationend', () => {
            heart.remove();
            heartCount--;
        });
    });

    heart.addEventListener('animationend', () => {
        if (!heart.classList.contains('popped')) {
            heart.remove();
            heartCount--;
        }
    });
}

function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="modal-content">
        <form id="nameForm">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter your name" required>
            <label for="age">Age:</label>
            <input type="text" name="age" id="age" placeholder="Enter your age" required>
            <button type="submit">Submit</button>
            <button type="button" id="closeModal">Close</button>
        </form>
    </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("nameForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value, 10);

        modal.remove(); // Close the initial modal

        // Open a new modal with the message
        const messageModal = document.createElement('div');
        messageModal.classList.add('modal');
        messageModal.innerHTML = `
        <div class="modal-content">
            <p class="message">${
                name.toLowerCase() === "angela irish alday" && age > 23
                    ? "Hi crush kita"
                    : "I don't even know you"
            }</p>
            <button id="closeMessageModal">Close</button>
        </div>
        `;
        document.body.appendChild(messageModal);

        if (name.toLowerCase() === "angela irish alday" && age > 23) {
            // Play the song if the message is "Hi crush kita"
            const audio = new Audio('photograph.mp3'); // Replace 'song.mp3' with your actual audio file path
            audio.play();
            audio.loop = true; // Loop the audio if desired

            // Stop the audio when the message modal is closed
            document.getElementById('closeMessageModal').addEventListener('click', () => {
                audio.pause();
                messageModal.remove(); // Close the message modal
            });
        } else {
            document.getElementById('closeMessageModal').addEventListener('click', () => {
                messageModal.remove(); // Close the message modal
            });
        }
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove(); // Close the initial modal without submitting
    });
}

setInterval(createHeart, 1500);
