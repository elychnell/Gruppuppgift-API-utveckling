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
                    ? '<span class="badge badge-admin">Admin</span>'
                    : '<span class="badge badge-user">User</span>';

                const date = new Date(user.created_at).toLocaleDateString('sv-SE');

                row.innerHTML = `
                    <td></td>
                    <td><span class="badge ${user.is_admin ? 'badge-admin' : 'badge-user'}">${user.is_admin ? 'Admin' : 'User'}</span></td>
                    <td>${date}</td>
                    <td>
                        <div class="admin-nav-actions">
                            <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${user._id}" data-username="${user.username}" data-is-admin="${user.is_admin}">Edit</button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user._id}">Delete</button>
                        </div>
                    </td>
                `;

                row.querySelector("td").textContent = user.username
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
       <form id="edit-user-form" class="edit-user-form">
        <h2>Edit User</h2>
        <label for="edit-username">Username:</label>
        <input type="text" id="edit-username" name="edit-username" required>
        <label for="edit-password">Password:</label>
        <input type="password" id="edit-password" name="edit-password">
        <div class="is-admin-container">
            <label for="edit-is-admin">Is Admin:</label>
            <input type="checkbox" id="edit-is-admin" name="edit-is-admin" ${isAdmin ? "checked" : ""}>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-outline-secondary" id="cancel-edit">Cancel</button>
    </form>`;

    document.body.appendChild(dialog);
    dialog.querySelector("#edit-username").value = username;
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