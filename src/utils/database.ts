import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// Type aliases for easier use
type ThumbnailRow = Database['public']['Tables']['thumbnails']['Row'];
type ThumbnailInsert = Database['public']['Tables']['thumbnails']['Insert'];
type ThumbnailUpdate = Database['public']['Tables']['thumbnails']['Update'];

type ClientRow = Database['public']['Tables']['clients']['Row'];
type ClientInsert = Database['public']['Tables']['clients']['Insert'];
type ClientUpdate = Database['public']['Tables']['clients']['Update'];

type OrderRow = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];

type CommunicationRow = Database['public']['Tables']['communications']['Row'];
type CommunicationInsert = Database['public']['Tables']['communications']['Insert'];
type CommunicationUpdate = Database['public']['Tables']['communications']['Update'];

// Thumbnail functions
export const getThumbnails = async (): Promise<ThumbnailRow[]> => {
  const { data, error } = await supabase
    .from('thumbnails')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching thumbnails:', error);
    throw error;
  }

  return data || [];
};

export const addThumbnail = async (thumbnail: ThumbnailInsert): Promise<ThumbnailRow> => {
  const { data, error } = await supabase
    .from('thumbnails')
    .insert(thumbnail)
    .select()
    .single();

  if (error) {
    console.error('Error adding thumbnail:', error);
    throw error;
  }

  return data;
};

export const updateThumbnail = async (id: string, updates: ThumbnailUpdate): Promise<ThumbnailRow> => {
  const { data, error } = await supabase
    .from('thumbnails')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating thumbnail:', error);
    throw error;
  }

  return data;
};

export const deleteThumbnail = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('thumbnails')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting thumbnail:', error);
    throw error;
  }
};

// Client functions
export const getClients = async (): Promise<ClientRow[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }

  return data || [];
};

export const addClient = async (client: ClientInsert): Promise<ClientRow> => {
  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select()
    .single();

  if (error) {
    console.error('Error adding client:', error);
    throw error;
  }

  return data;
};

export const updateClient = async (id: string, updates: ClientUpdate): Promise<ClientRow> => {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating client:', error);
    throw error;
  }

  return data;
};

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// Order functions
export const getOrders = async (): Promise<OrderRow[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data || [];
};

export const getOrdersByClient = async (clientId: string): Promise<OrderRow[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders by client:', error);
    throw error;
  }

  return data || [];
};

export const addOrder = async (order: OrderInsert): Promise<OrderRow> => {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error adding order:', error);
    throw error;
  }

  return data;
};

export const updateOrder = async (id: string, updates: OrderUpdate): Promise<OrderRow> => {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    throw error;
  }

  return data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Communication functions
export const getCommunications = async (): Promise<CommunicationRow[]> => {
  const { data, error } = await supabase
    .from('communications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching communications:', error);
    throw error;
  }

  return data || [];
};

export const getCommunicationsByClient = async (clientId: string): Promise<CommunicationRow[]> => {
  const { data, error } = await supabase
    .from('communications')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching communications by client:', error);
    throw error;
  }

  return data || [];
};

export const addCommunication = async (communication: CommunicationInsert): Promise<CommunicationRow> => {
  const { data, error } = await supabase
    .from('communications')
    .insert(communication)
    .select()
    .single();

  if (error) {
    console.error('Error adding communication:', error);
    throw error;
  }

  return data;
};

export const updateCommunication = async (id: string, updates: CommunicationUpdate): Promise<CommunicationRow> => {
  const { data, error } = await supabase
    .from('communications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating communication:', error);
    throw error;
  }

  return data;
};

export const deleteCommunication = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('communications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting communication:', error);
    throw error;
  }
};