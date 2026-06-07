import { useEffect, useState } from "react";

import {
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../../service/api";

export function UsersAdmin() {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response =
        await api.get("/user/");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(
        `/user/${selectedUser._id}`
      );

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) =>
            user._id !== selectedUser._id
        )
      );

      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="admin-card">
      <div className="card-top">
        <h2>Usuários</h2>
      </div>

      <div className="crud-list">
        {users.map((user) => (
          <div
            className="crud-item"
            key={user._id}
          >
            <div>
              <h3>{user.name}</h3>

              <span>
                {user.email}
              </span>
            </div>

            <div className="crud-actions">
              <button
                onClick={() =>
                  openDeleteModal(user)
                }
                title="Excluir usuário"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>
                Excluir Usuário
              </h3>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
              >
                <FiX />
              </button>
            </div>

            <p>
              Deseja realmente excluir o
              usuário{" "}
              <strong>
                {selectedUser?.name}
              </strong>
              ?
            </p>

            <div className="admin-modal-actions">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}