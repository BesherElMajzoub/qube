@extends('layouts.admin')

@section('title', 'Add Product - QUBE Admin')
@section('page-title', 'Add Product')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0"><i class="bi bi-plus-circle me-2"></i>New Product</h5>
                <a href="{{ route('admin.products.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>

            <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Name (English) <span class="text-danger">*</span></label>
                        <input type="text" name="name_en" class="form-control @error('name_en') is-invalid @enderror"
                               value="{{ old('name_en') }}" required>
                        @error('name_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Name (Arabic) <span class="text-danger">*</span></label>
                        <input type="text" name="name_ar" class="form-control @error('name_ar') is-invalid @enderror"
                               value="{{ old('name_ar') }}" dir="rtl" required>
                        @error('name_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (English)</label>
                        <textarea name="description_en" class="form-control @error('description_en') is-invalid @enderror"
                                  rows="4">{{ old('description_en') }}</textarea>
                        @error('description_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (Arabic)</label>
                        <textarea name="description_ar" class="form-control @error('description_ar') is-invalid @enderror"
                                  rows="4" dir="rtl">{{ old('description_ar') }}</textarea>
                        @error('description_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Category <span class="text-danger">*</span></label>
                        <select name="category" class="form-select @error('category') is-invalid @enderror" required>
                            <option value="">Select category</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->name_en }}" {{ old('category') == $cat->name_en ? 'selected' : '' }}>
                                    {{ $cat->name_en }} ({{ $cat->name_ar }})
                                </option>
                            @endforeach
                        </select>
                        @error('category') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Price</label>
                        <input type="number" step="0.01" name="price" class="form-control @error('price') is-invalid @enderror"
                               value="{{ old('price') }}">
                        @error('price') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-4">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-control @error('image') is-invalid @enderror" accept="image/*">
                        @error('image') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1"
                                   {{ old('featured') ? 'checked' : '' }}>
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
                        <i class="bi bi-check-lg me-1"></i> Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
