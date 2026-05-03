import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Mail, Calendar, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
`;

const Header = styled.div`
  max-width: 1000px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f1f5f9;
      transform: translateX(-2px);
    }
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #eff6ff;
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    display: flex;
    flex-direction: column;
    span { color: #64748b; font-size: 0.875rem; font-weight: 600; }
    strong { color: #1e293b; font-size: 1.5rem; font-weight: 800; }
  }
`;

const TableContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background: #f8fafc;
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  tr:last-child td { border-bottom: none; }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    background: #2563eb;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.875rem;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .details {
    display: flex;
    flex-direction: column;
    strong { color: #1e293b; font-size: 0.875rem; }
    small { color: #64748b; font-size: 0.75rem; }
  }
`;

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => props.$admin ? '#fee2e2' : '#f1f5f9'};
  color: ${props => props.$admin ? '#ef4444' : '#475569'};
  border: 1px solid ${props => props.$admin ? '#fecaca' : '#e2e8f0'};
`;

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Erro ao carregar usuários. Verifique se você é um administrador.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }

    if (currentUser?.role === 'admin') {
      loadUsers();
    } else {
      toast.error('Acesso negado');
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (loading) return <AdminContainer>Carregando painel...</AdminContainer>;

  return (
    <AdminContainer>
      <Header>
        <h1><Shield size={32} color="#2563eb" /> Painel de Controle</h1>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} /> Voltar
        </button>
      </Header>

      <StatsGrid>
        <StatCard>
          <div className="icon-box"><Users size={24} /></div>
          <div className="info">
            <span>Total de Usuários</span>
            <strong>{users.length}</strong>
          </div>
        </StatCard>
        <StatCard>
          <div className="icon-box" style={{ background: '#fef2f2', color: '#ef4444' }}><Shield size={24} /></div>
          <div className="info">
            <span>Administradores</span>
            <strong>{users.filter(u => u.role === 'admin').length}</strong>
          </div>
        </StatCard>
      </StatsGrid>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Papel</th>
              <th>UID</th>
              <th>Último Acesso</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>
                  <UserInfo>
                    <div className="avatar">
                      {user.photoURL ? <img src={user.photoURL} alt={user.displayName} /> : user.displayName?.charAt(0)}
                    </div>
                    <div className="details">
                      <strong>{user.displayName}</strong>
                      <small>{user.uid.substring(0, 8)}...</small>
                    </div>
                  </UserInfo>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.875rem' }}>
                    <Mail size={14} /> {user.email}
                  </div>
                </td>
                <td>
                  <Badge $admin={user.role === 'admin'}>{user.role}</Badge>
                </td>
                <td>
                  <code style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '2px 4px', borderRadius: '4px' }}>{user.uid}</code>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <Calendar size={14} /> {user.lastLogin?.toDate ? user.lastLogin.toDate().toLocaleDateString() : 'N/A'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </AdminContainer>
  );
}
