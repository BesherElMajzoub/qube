/**
 * React Query hooks for Laravel API
 * Drop-in replacements for tRPC hooks
 * 
 * Usage: Instead of `trpc.products.all.useQuery()`, use `useAllProducts()`
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProduct,
  getAllProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  getProject,
  getCategories,
  submitContactForm,
  getSettings,
  getAbout,
  trackVisitor,
  trackClick,
  type ContactFormData,
} from './api';

// ==================== CATEGORIES ====================

export function useCategories(type?: 'product' | 'project') {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: () => getCategories(type),
  });
}

// ==================== PRODUCTS ====================

export function useAllProducts() {
  return useQuery({
    queryKey: ['products', 'all'],
    queryFn: getAllProducts,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'byCategory', category],
    queryFn: () => getProductsByCategory(category),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

// ==================== PROJECTS ====================

export function useAllProjects() {
  return useQuery({
    queryKey: ['projects', 'all'],
    queryFn: getAllProjects,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: getFeaturedProjects,
  });
}

export function useProjectsByCategory(category: string) {
  return useQuery({
    queryKey: ['projects', 'byCategory', category],
    queryFn: () => getProjectsByCategory(category),
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
}

// ==================== CONTACT ====================

export function useSubmitContact() {
  return useMutation({
    mutationFn: (formData: ContactFormData) => submitContactForm(formData),
  });
}

// ==================== SETTINGS ====================

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
}

// ==================== ABOUT ====================

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAbout,
  });
}

// ==================== TRACKING ====================

export function useTrackVisitor() {
  return useMutation({
    mutationFn: () => trackVisitor(),
  });
}

export function useTrackClick() {
  return useMutation({
    mutationFn: (element?: string) => trackClick(element),
  });
}
