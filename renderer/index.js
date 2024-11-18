const sidebarLinks = document.querySelectorAll(".sidebar-links a");
const pages = document.querySelectorAll("div[id$='-page']"); // Gets all div elements that ends with "-page"

// Switch between pages
sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Stops default link action

        // Gets the data page value from the clicked a tag
        const targetPage = link.getAttribute("data-page");

        // Hides all other pages
        pages.forEach((page) => {
            page.style.display = "none";
        });

        // Show the target page
        const pageToShow = document.getElementById(targetPage);
        if (pageToShow) {
            pageToShow.style.display = "block";
        }
    });
});

// Add new folder functionality
document.addEventListener("DOMContentLoaded", () => {
    const addFolderBtn = document.getElementById("add-folder-btn");
    const foldersContainer = document.querySelector(".folders-container");
    const MAX_FOLDER_NAME_LENGTH = 20; // Define max folder name length

    // Remove any previous event listener to prevent duplication
    if (addFolderBtn._hasEventListener) return;
    addFolderBtn._hasEventListener = true; // Mark that the event listener is added

    function createNewFolder(folderName) {
        const folderDiv = document.createElement("div");
        folderDiv.classList.add("folder");

        const folderImg = document.createElement("img");
        folderImg.src = "assets/Folder.png";
        folderImg.alt = "Folder";

        const folderNameElement = document.createElement("h3");
        folderNameElement.classList.add("folder-name");

        // Add title attribute for hover tooltip
        folderDiv.title = folderName;

        // Truncate name if it exceeds the limit
        folderNameElement.textContent =
            folderName.length > MAX_FOLDER_NAME_LENGTH
                ? folderName.substring(0, MAX_FOLDER_NAME_LENGTH) + "..."
                : folderName;

        folderDiv.appendChild(folderImg);
        folderDiv.appendChild(folderNameElement);
        foldersContainer.appendChild(folderDiv);
    }

    function showFolderNamePrompt() {
        // Ensure no duplicate modals
        if (document.querySelector(".modal")) return;

        // Create a custom modal
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const promptLabel = document.createElement("label");
        promptLabel.textContent = "Enter folder name:";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Folder Name";
        inputField.classList.add("modal-input");

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("modal-buttons");

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Create";
        confirmButton.classList.add("modal-confirm");

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("modal-cancel");

        // Append everything to modal
        buttonsContainer.appendChild(confirmButton);
        buttonsContainer.appendChild(cancelButton);
        modalContent.appendChild(promptLabel);
        modalContent.appendChild(inputField);
        modalContent.appendChild(buttonsContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Helper to close modal
        function closeModal() {
            if (modal && modal.parentElement) {
                document.body.removeChild(modal); // Remove modal
            }
        }

        // Event listeners
        confirmButton.addEventListener("click", () => {
            let folderName = inputField.value.trim();

            // Truncate if pasted or input is too long
            folderName =
                folderName.length > MAX_FOLDER_NAME_LENGTH
                    ? folderName.substring(0, MAX_FOLDER_NAME_LENGTH) + "..."
                    : folderName;

            if (folderName) {
                createNewFolder(folderName);
            }
            closeModal(); // Close modal after confirming
        });

        cancelButton.addEventListener("click", () => {
            closeModal(); // Close modal on cancel
        });

        // Handle Enter key
        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                let folderName = inputField.value.trim();

                // Truncate if pasted or input is too long
                folderName =
                    folderName.length > MAX_FOLDER_NAME_LENGTH
                        ? folderName.substring(0, MAX_FOLDER_NAME_LENGTH) + "..."
                        : folderName;

                if (folderName) {
                    createNewFolder(folderName);
                }
                closeModal(); // Close modal after pressing Enter
            }
        });

        // Handle paste event
        inputField.addEventListener("paste", (e) => {
            setTimeout(() => {
                let pastedText = inputField.value;

                // Truncate pasted text if too long
                if (pastedText.length > MAX_FOLDER_NAME_LENGTH) {
                    inputField.value =
                        pastedText.substring(0, MAX_FOLDER_NAME_LENGTH);
                }
            }, 0);
        });

        // Focus on the input field when modal opens
        inputField.focus();
    }

    addFolderBtn.addEventListener("click", showFolderNamePrompt);
});
