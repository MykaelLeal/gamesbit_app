import {
  useEffect,
  useState,
} from "react";

import {
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import api from "../../service/api";

export function UsersAdmin() {
  const [users, setUsers] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      avatar: "",
      role: "client",
    });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response =
        await api.get("/user");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleEdit = (
    user
  ) => {
    setEditingId(user._id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      cpf: user.cpf || "",
      phone: user.phone || "",
      avatar: user.avatar || "",
      role: user.role || "client",
    });

    setShowForm(true);
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.patch(
        `/user/${editingId}`,
        form
      );

      setShowForm(false);
      setEditingId(null);

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Deseja excluir este usuário?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/user/${id}`
      );

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="admin-card">

      <div className="card-top">
        <h2>Usuários</h2>
      </div>

      {showForm && (
        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <div className="form-header">

            <h3>
              Editar Usuário
            </h3>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              <FiX />
            </button>

          </div>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="client">
              Cliente
            </option>

            <option value="admin">
              Administrador
            </option>
          </select>

          <button
            type="submit"
          >
            Atualizar Usuário
          </button>

        </form>
      )}

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
                  handleEdit(user)
                }
              >
                <FiEdit2 />
              </button>

              <button
                onClick={() =>
                  deleteUser(
                    user._id
                  )
                }
              >
                <FiTrash2 />
              </button>

            </div>
          </div>
        ))}

      </div>

    </section>
  );
}