// Local storage utilities for persisting data
export interface ThumbnailItem {
  id: number;
  title: string;
  category: string;
  image: string;
  views: string;
  likes: string;
  gameOverlay: string;
  dateAdded: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  platform: 'youtube' | 'twitch' | 'instagram' | 'other';
  channelName: string;
  channelUrl?: string;
  subscribers: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  rating: number;
  notes: string;
  lastContact: string;
  preferredContact: 'discord' | 'email' | 'phone';
}

export interface Order {
  id: number;
  clientId: number;
  packageType: 'basic' | 'standard' | 'premium' | 'custom';
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  deadline?: string;
  thumbnailsCount: number;
  revisions: number;
  maxRevisions: number;
  files: string[];
  notes: string;
}

export interface Communication {
  id: number;
  clientId: number;
  type: 'email' | 'discord' | 'phone' | 'meeting';
  subject: string;
  message: string;
  date: string;
  direction: 'incoming' | 'outgoing';
  status: 'read' | 'unread' | 'replied';
}

// Storage keys
const STORAGE_KEYS = {
  THUMBNAILS: 'thumbnailpro_thumbnails',
  CLIENTS: 'thumbnailpro_clients',
  ORDERS: 'thumbnailpro_orders',
  COMMUNICATIONS: 'thumbnailpro_communications'
};

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

// Thumbnail storage functions
export const saveThumbnails = (thumbnails: ThumbnailItem[]): void => {
  saveToStorage(STORAGE_KEYS.THUMBNAILS, thumbnails);
};

export const loadThumbnails = (): ThumbnailItem[] => {
  return loadFromStorage<ThumbnailItem>(STORAGE_KEYS.THUMBNAILS);
};

export const addThumbnail = (thumbnail: Omit<ThumbnailItem, 'id' | 'dateAdded'>): ThumbnailItem => {
  const thumbnails = loadThumbnails();
  const newThumbnail: ThumbnailItem = {
    ...thumbnail,
    id: Date.now(),
    dateAdded: new Date().toISOString()
  };
  const updatedThumbnails = [...thumbnails, newThumbnail];
  saveThumbnails(updatedThumbnails);
  return newThumbnail;
};

export const updateThumbnail = (id: number, updates: Partial<ThumbnailItem>): void => {
  const thumbnails = loadThumbnails();
  const updatedThumbnails = thumbnails.map(thumbnail =>
    thumbnail.id === id ? { ...thumbnail, ...updates } : thumbnail
  );
  saveThumbnails(updatedThumbnails);
};

export const deleteThumbnail = (id: number): void => {
  const thumbnails = loadThumbnails();
  const updatedThumbnails = thumbnails.filter(thumbnail => thumbnail.id !== id);
  saveThumbnails(updatedThumbnails);
};

// Client storage functions
export const saveClients = (clients: Client[]): void => {
  saveToStorage(STORAGE_KEYS.CLIENTS, clients);
};

export const loadClients = (): Client[] => {
  return loadFromStorage<Client>(STORAGE_KEYS.CLIENTS);
};

export const addClient = (client: Omit<Client, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent' | 'lastContact'>): Client => {
  const clients = loadClients();
  const newClient: Client = {
    ...client,
    id: Date.now(),
    joinDate: new Date().toISOString().split('T')[0],
    totalOrders: 0,
    totalSpent: 0,
    lastContact: new Date().toISOString().split('T')[0]
  };
  const updatedClients = [...clients, newClient];
  saveClients(updatedClients);
  return newClient;
};

export const updateClient = (id: number, updates: Partial<Client>): void => {
  const clients = loadClients();
  const updatedClients = clients.map(client =>
    client.id === id ? { ...client, ...updates } : client
  );
  saveClients(updatedClients);
};

export const deleteClient = (id: number): void => {
  const clients = loadClients();
  const updatedClients = clients.filter(client => client.id !== id);
  saveClients(updatedClients);
};

// Order storage functions
export const saveOrders = (orders: Order[]): void => {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
};

export const loadOrders = (): Order[] => {
  return loadFromStorage<Order>(STORAGE_KEYS.ORDERS);
};

export const addOrder = (order: Omit<Order, 'id' | 'orderDate' | 'revisions'>): Order => {
  const orders = loadOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now(),
    orderDate: new Date().toISOString().split('T')[0],
    revisions: 0
  };
  const updatedOrders = [...orders, newOrder];
  saveOrders(updatedOrders);
  return newOrder;
};

export const updateOrder = (id: number, updates: Partial<Order>): void => {
  const orders = loadOrders();
  const updatedOrders = orders.map(order =>
    order.id === id ? { ...order, ...updates } : order
  );
  saveOrders(updatedOrders);
};

export const deleteOrder = (id: number): void => {
  const orders = loadOrders();
  const updatedOrders = orders.filter(order => order.id !== id);
  saveOrders(updatedOrders);
};

// Communication storage functions
export const saveCommunications = (communications: Communication[]): void => {
  saveToStorage(STORAGE_KEYS.COMMUNICATIONS, communications);
};

export const loadCommunications = (): Communication[] => {
  return loadFromStorage<Communication>(STORAGE_KEYS.COMMUNICATIONS);
};

export const addCommunication = (communication: Omit<Communication, 'id' | 'date' | 'status'>): Communication => {
  const communications = loadCommunications();
  const newCommunication: Communication = {
    ...communication,
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    status: 'unread'
  };
  const updatedCommunications = [...communications, newCommunication];
  saveCommunications(updatedCommunications);
  return newCommunication;
};

export const updateCommunication = (id: number, updates: Partial<Communication>): void => {
  const communications = loadCommunications();
  const updatedCommunications = communications.map(communication =>
    communication.id === id ? { ...communication, ...updates } : communication
  );
  saveCommunications(updatedCommunications);
};

export const deleteCommunication = (id: number): void => {
  const communications = loadCommunications();
  const updatedCommunications = communications.filter(communication => communication.id !== id);
  saveCommunications(updatedCommunications);
};

// Utility function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Utility function to compress image
export const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.src = URL.createObjectURL(file);
  });
};