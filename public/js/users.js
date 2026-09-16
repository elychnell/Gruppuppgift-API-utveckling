import { checkAuthStatus, authStatusResult } from './auth.js';

async function fetchUsers() {
    try {
        const response = await fetch('/api/users', {
            method: "GET",

            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = "index.html?message=You must be logged in to view this page";
            return;
        }

        const users = await response.json();

        if (response.ok) {
            const usersTableBody = document.getElementById("users-table-body");

            usersTableBody.innerHTML = "";

            users.forEach(user => {
                const row = document.createElement("tr");

                const role = user.is_admin
                    ? '<span class="badge bg-primary">Admin</span>'
                    : '<span class="badge bg-secondary">User</span>';

                const date = new Date(user.created_at).toLocaleDateString('sv-SE');

                row.innerHTML = `
                    <td class="ps-4">${user.username}</td>
                    <td>${role}</td>
                    <td class="pe-4">${date}</td>
                      <td class="pe-4">
                        <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${user._id}" data-username="${user.username}" data-is-admin="${user.is_admin}"> Edit </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user._id}"> Delete </button>                   
                    </td>
                `;
                usersTableBody.appendChild(row);
            });

            addUserEventListeners();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function addUserEventListeners() {
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const userId = button.getAttribute("data-id");
            const username = button.getAttribute("data-username");
            const isAdmin = button.getAttribute("data-is-admin") === "true";

            editUser(userId, username, isAdmin)
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const userId = event.target.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this user?")) {
                try {
                    const response = await fetch(`/api/users/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });

                    if (response.ok) {
                        alert("User deleted successfully!");
                        fetchUsers();
                    } else {
                        const data = await response.json();
                        alert("Error deleting user: " + data.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        });
    });
}

function editUser(userId, username, isAdmin) {
    const dialog = document.createElement("dialog");

    dialog.innerHTML = `
        <form id="edit-user-form">
        <h2>Edit User</h2>
        <label for="edit-username">Username:</label>
        <input type="text" id="edit-username" name="edit-username" value="${username}" required>
        <label for="edit-password">Password:</label>
        <input type="password" id="edit-password" name="edit-password">
        <label for="edit-is-admin">Is Admin:</label>
        <input type="checkbox" id="edit-is-admin" name="edit-is-admin" ${isAdmin ? "checked" : ""}>

        <button type="submit">Save</button>
        <button type="button" id="cancel-edit">Cancel</button>
    </form>`;

    document.body.appendChild(dialog);
    dialog.showModal();

    const editUserForm = dialog.querySelector("#edit-user-form");
    editUserForm.addEventListener('submit', (e) => {
        updateUser(e, userId, dialog);
    });

    const cancelEditButton = dialog.querySelector("#cancel-edit");
    cancelEditButton.addEventListener("click", () => {
        dialog.close();
    });
    
    dialog.addEventListener("close", () => {
        dialog.remove();
    });
}

async function updateUser(e, userId, dialog) {
    e.preventDefault();

    const newUsername = dialog.querySelector("#edit-username").value;
    const newIsAdmin = dialog.querySelector("#edit-is-admin").checked;
    const newPassword = dialog.querySelector("#edit-password").value

    const updateData = {
        username: newUsername,
        is_admin: newIsAdmin
    };

    if (newPassword) {
        updateData.password = newPassword;
    }

    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            alert("User updated successfully!");
            dialog.close();
            fetchUsers();
        } else {
            const data = await response.json();
            alert("Error updating user: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function initAdminPage() {
    await checkAuthStatus();

    if (!authStatusResult.authenticated || !authStatusResult.is_admin) {
        window.location.href = "index.html?message=Admin access required";
        return;
    }

    fetchUsers();
}

document.getElementById("back-btn").addEventListener("click", function (e) {
    e.preventDefault()

    window.location.href = "index.html";
});

initAdminPage();