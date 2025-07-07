import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Calendar, 
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  Mail,
  Phone,
  Youtube,
  Twitch,
  Instagram,
  User,
  Package,
  FileText
} from 'lucide-react';
import { 
  getClients,
  getOrders,
  getCommunications,
  addClient,
  addOrder,
  addCommunication,
  updateClient,
  deleteClient
} from '../utils/database';
import type { Database } from '../lib/supabase';

type ClientRow = Database['public']['Tables']['clients']['Row'];
type OrderRow = Database['public']['Tables']['orders']['Row'];
type CommunicationRow = Database['public']['Tables']['communications']['Row'];

const ClientManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null);
  const [editingClient, setEditingClient] = useState<ClientRow | null>(null);
  const [loading, setLoading] = useState(true);

  // State for data
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [communications, setCommunications] = useState<CommunicationRow[]>([]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clientsData, ordersData, communicationsData] = await Promise.all([
          getClients(),
          getOrders(),
          getCommunications()
        ]);
        setClients(clientsData);
        setOrders(ordersData);
        setCommunications(communicationsData);
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    platform: 'youtube',
    channelName: '',
    channelUrl: '',
    subscribers: '',
    status: 'active',
    rating: 5,
    notes: '',
    preferredContact: 'discord'
  });

  const [newOrder, setNewOrder] = useState({
    packageType: 'basic',
    title: '',
    description: '',
    price: 100,
    thumbnailsCount: 1,
    maxRevisions: 1,
    notes: ''
  });

  const [newCommunication, setNewCommunication] = useState({
    type: 'discord',
    subject: '',
    message: '',
    direction: 'outgoing'
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'twitch': return <Twitch className="w-4 h-4 text-purple-500" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      default: return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'vip': return 'text-purple-400 bg-purple-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'review': return 'text-orange-400 bg-orange-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.channel_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddClient = async () => {
    if (newClient.name && newClient.email) {
      try {
        const clientData = {
          name: newClient.name,
          email: newClient.email,
          phone: newClient.phone || '',
          platform: newClient.platform,
          channel_name: newClient.channelName || '',
          channel_url: newClient.channelUrl || '',
          subscribers: newClient.subscribers || '0',
          status: newClient.status,
          rating: newClient.rating || 5,
          notes: newClient.notes || '',
          preferred_contact: newClient.preferredContact
        };
        
        const client = await addClient(clientData);
        setClients(prev => [client, ...prev]);
        setNewClient({
          name: '',
          email: '',
          phone: '',
          platform: 'youtube',
          channelName: '',
          channelUrl: '',
          subscribers: '',
          status: 'active',
          rating: 5,
          notes: '',
          preferredContact: 'discord'
        });
        setShowAddModal(false);
        alert('Client added successfully!');
      } catch (error) {
        console.error('Error adding client:', error);
        alert('Error adding client. Please try again.');
      }
    } else {
      alert('Please fill in the name and email fields.');
    }
  };

  const handleAddOrder = async () => {
    if (selectedClient && newOrder.title) {
      try {
        const orderData = {
          client_id: selectedClient.id,
          package_type: newOrder.packageType,
          title: newOrder.title,
          description: newOrder.description || '',
          price: newOrder.price || 100,
          status: 'pending' as const,
          thumbnails_count: newOrder.thumbnailsCount || 1,
          max_revisions: newOrder.maxRevisions || 1,
          files: [],
          notes: newOrder.notes || ''
        };
        
        const order = await addOrder(orderData);
        setOrders(prev => [order, ...prev]);
        
        // Update client stats
        await updateClient(selectedClient.id, {
          total_orders: selectedClient.total_orders + 1,
          total_spent: selectedClient.total_spent + order.price,
          last_contact: new Date().toISOString().split('T')[0]
        });
        
        setClients(prev => prev.map(client => 
          client.id === selectedClient.id 
            ? { 
                ...client, 
                total_orders: client.total_orders + 1,
                total_spent: client.total_spent + order.price,
                last_contact: new Date().toISOString().split('T')[0]
              }
            : client
        ));
        
        setNewOrder({
          packageType: 'basic',
          title: '',
          description: '',
          price: 100,
          thumbnailsCount: 1,
          maxRevisions: 1,
          notes: ''
        });
        setShowOrderModal(false);
        alert('Order added successfully!');
      } catch (error) {
        console.error('Error adding order:', error);
        alert('Error adding order. Please try again.');
      }
    } else {
      alert('Please fill in the order title.');
    }
  };

  const handleAddCommunication = async () => {
    if (selectedClient && newCommunication.subject) {
      try {
        const communicationData = {
          client_id: selectedClient.id,
          type: newCommunication.type,
          subject: newCommunication.subject,
          message: newCommunication.message || '',
          direction: newCommunication.direction
        };
        
        const communication = await addCommunication(communicationData);
        setCommunications(prev => [communication, ...prev]);
        
        // Update client last contact
        await updateClient(selectedClient.id, {
          last_contact: new Date().toISOString().split('T')[0]
        });
        
        setClients(prev => prev.map(client => 
          client.id === selectedClient.id 
            ? { ...client, last_contact: new Date().toISOString().split('T')[0] }
            : client
        ));
        
        setNewCommunication({
          type: 'discord',
          subject: '',
          message: '',
          direction: 'outgoing'
        });
        setShowCommunicationModal(false);
        alert('Communication added successfully!');
      } catch (error) {
        console.error('Error adding communication:', error);
        alert('Error adding communication. Please try again.');
      }
    } else {
      alert('Please fill in the subject field.');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm('Are you sure you want to delete this client? This will also delete all associated orders and communications.')) {
      try {
        await deleteClient(id);
        setClients(prev => prev.filter(c => c.id !== id));
        alert('Client deleted successfully!');
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client. Please try again.');
      }
    }
  };

  const clientOrders = selectedClient ? orders.filter(order => order.client_id === selectedClient.id) : [];
  const clientCommunications = selectedClient ? communications.filter(comm => comm.client_id === selectedClient.id) : [];

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading client data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Client Management</h2>
          <p className="text-gray-400">Manage your clients, orders, and communications</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Client
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Clients</p>
              <p className="text-2xl font-bold text-white">{clients.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Orders</p>
              <p className="text-2xl font-bold text-white">{orders.filter(o => o.status === 'in-progress').length}</p>
            </div>
            <Package className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{clients.reduce((sum, client) => sum + client.total_spent, 0)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">VIP Clients</p>
              <p className="text-2xl font-bold text-white">{clients.filter(c => c.status === 'vip').length}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
        {clients.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Clients Yet</h3>
            <p className="text-gray-400 mb-6">Start building your client base by adding your first client.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Add Your First Client
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Client</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Platform</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Orders</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Revenue</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Last Contact</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{client.name}</div>
                        <div className="text-gray-400 text-sm">{client.email}</div>
                        <div className="text-gray-400 text-sm">{client.channel_name} ({client.subscribers})</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getPlatformIcon(client.platform)}
                        <span className="ml-2 text-gray-300 capitalize">{client.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{client.total_orders}</td>
                    <td className="px-6 py-4 text-white">₹{client.total_spent}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{client.last_contact}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setEditingClient(client)}
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Edit Client"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add New Client</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="client@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Platform</label>
                  <select
                    value={newClient.platform}
                    onChange={(e) => setNewClient(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="twitch">Twitch</option>
                    <option value="instagram">Instagram</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Channel Name</label>
                  <input
                    type="text"
                    value={newClient.channelName}
                    onChange={(e) => setNewClient(prev => ({ ...prev, channelName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="Channel/Username"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Subscribers</label>
                  <input
                    type="text"
                    value={newClient.subscribers}
                    onChange={(e) => setNewClient(prev => ({ ...prev, subscribers: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="e.g., 150K"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="active">Active</option>
                    <option value="vip">VIP</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Notes</label>
                <textarea
                  value={newClient.notes}
                  onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Additional notes about the client..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddClient}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Add Client
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;