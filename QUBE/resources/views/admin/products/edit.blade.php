@extends('layouts.admin')

@section('title', 'Edit Product - QUBE Admin')
@section('page-title', 'Edit Product')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0"><i class="bi bi-pencil me-2"></i>Edit Product</h5>
                <a href="{{ route('admin.products.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>

            <form action="{{ route('admin.products.update', $product) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Name (English) <span class="text-danger">*</span></label>
                        <input type="text" name="name_en" class="form-control @error('name_en') is-invalid @enderror"
                               value="{{ old('name_en', $product->name_en) }}" required>
                        @error('name_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Name (Arabic) <span class="text-danger">*</span></label>
                        <input type="text" name="name_ar" class="form-control @error('name_ar') is-invalid @enderror"
                               value="{{ old('name_ar', $product->name_ar) }}" dir="rtl" required>
                        @error('name_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (English)</label>
                        <textarea name="description_en" class="form-control @error('description_en') is-invalid @enderror"
                                  rows="4">{{ old('description_en', $product->description_en) }}</textarea>
                        @error('description_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (Arabic)</label>
                        <textarea name="description_ar" class="form-control @error('description_ar') is-invalid @enderror"
                                  rows="4" dir="rtl">{{ old('description_ar', $product->description_ar) }}</textarea>
                        @error('description_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Category <span class="text-danger">*</span></label>
                        <select name="category" class="form-select @error('category') is-invalid @enderror" required>
                            <option value="marble" {{ old('category', $product->category) == 'marble' ? 'selected' : '' }}>Marble</option>
                            <option value="wood" {{ old('category', $product->category) == 'wood' ? 'selected' : '' }}>Wood</option>
                            <option value="engineered" {{ old('category', $product->category) == 'engineered' ? 'selected' : '' }}>Engineered</option>
                        </select>
                        @error('category') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Price</label>
                        <input type="number" step="0.01" name="price" class="form-control @error('price') is-invalid @enderror"
                               value="{{ old('price', $product->price) }}">
                        @error('price') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-control @error('image') is-invalid @enderror" accept="image/*">
                        @error('image') <div class="invalid-feedback">{{ $message }}</div> @enderror

                        @if($product->image)
                            <div class="mt-2">
                                <small class="text-muted">Current image:</small>
                                <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name_en }}"
                                     class="d-block mt-1" style="max-width: 120px; border-radius: 8px; border: 1px solid var(--border-color);">
                            </div>
                        @endif
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1"
                                   {{ old('featured', $product->featured) ? 'checked' : '' }}>
                            <label class="form-check-label" for="featured">
                                <i class="bi bi-star-fill text-warning me-1"></i> Mark as Featured
                            </label>
                        </div>
                    </div>
                </div>

                <hr class="my-4">

                <div class="d-flex justify-content-end gap-2">
                    <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-check-lg me-1"></i> Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
