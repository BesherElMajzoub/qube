/**
 * Laravel API client for QUBE
 * Connects the React frontend to the Laravel backend
 */
import axios from 'axios';

// Laravel API base URL - adjust based on environment
const API_BASE_URL = import.meta.env.VITE_LARAVEL_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ==================== TYPES ====================

export interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  type: 'product' | 'project';
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string | null;
  descriptionAr: string | null;
  category: string;
  imageUrl: string | null;
  price: string | null;
  featured: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  titleAr: string;
  description: string | null;
  descriptionAr: string | null;
  category: string;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  images: string[];
  caseStudy: string | null;
  caseStudyAr: string | null;
  featured: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  projectType?: string;
  measurements?: string;
  preferredColor?: string;
}

export interface Settings {
  phone1: string;
  phone2: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address_en: string;
  address_ar: string;
}

export interface About {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==================== API FUNCTIONS ====================

// Categories
export async function getCategories(type?: 'product' | 'project'): Promise<Category[]> {
  const params = type ? { type } : {};
  const { data } = await apiClient.get<ApiResponse<Category[]>>('/categories', { params });
  return data.data;
}

// Products
export async function getAllProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ApiResponse<Product[]>>('/products');
  return data.data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ApiResponse<Product[]>>('/products', {
    params: { featured: true },
  });
  return data.data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data } = await apiClient.get<ApiResponse<Product[]>>('/products', {
    params: { category },
  });
  return data.data;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  return data.data;
}

// Projects
export async function getAllProjects(): Promise<Project[]> {
  const { data } = await apiClient.get<ApiResponse<Project[]>>('/projects');
  return data.data;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await apiClient.get<ApiResponse<Project[]>>('/projects', {
    params: { featured: true },
  });
  return data.data;
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const { data } = await apiClient.get<ApiResponse<Project[]>>('/projects', {
    params: { category },
  });
  return data.data;
}

export async function getProject(id: number): Promise<Project> {
  const { data } = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
  return data.data;
}

// Contact
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.post('/contact', formData);
  return data;
}

// Tracking
export async function trackVisitor(): Promise<void> {
  try {
    await apiClient.post('/track/visitor');
  } catch (error) {
    console.warn('Failed to track visitor:', error);
  }
}

export async function trackClick(element?: string): Promise<void> {
  try {
    await apiClient.post('/track/click', { element: element || 'general' });
  } catch (error) {
    console.warn('Failed to track click:', error);
  }
}

// Settings
export async function getSettings(): Promise<Settings> {
  const { data } = await apiClient.get<ApiResponse<Settings>>('/settings');
  return data.data;
}

// About
export async function getAbout(): Promise<About | null> {
  const { data } = await apiClient.get<ApiResponse<About | null>>('/about');
  return data.data;
}

export default apiClient;
