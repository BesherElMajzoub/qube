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
  getAllProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  submitContactForm,
  getSettings,
  getAbout,
  trackVisitor,
  trackClick,
  type ContactFormData,
} from './api';

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

export function useProductsByCategory(category: 'marble' | 'wood' | 'engineered') {
  return useQuery({
    queryKey: ['products', 'byCategory', category],
    queryFn: () => getProductsByCategory(category),
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

export function useProjectsByCategory(category: 'residential' | 'commercial') {
  return useQuery({
    queryKey: ['projects', 'byCategory', category],
    queryFn: () => getProjectsByCategory(category),
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
