@extends('layouts.admin')

@section('title', 'Add Project - QUBE Admin')
@section('page-title', 'Add Project')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0"><i class="bi bi-plus-circle me-2"></i>New Project</h5>
                <a href="{{ route('admin.projects.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>

            <form action="{{ route('admin.projects.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Title (English) <span class="text-danger">*</span></label>
                        <input type="text" name="title_en" class="form-control @error('title_en') is-invalid @enderror"
                               value="{{ old('title_en') }}" required>
                        @error('title_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Title (Arabic) <span class="text-danger">*</span></label>
                        <input type="text" name="title_ar" class="form-control @error('title_ar') is-invalid @enderror"
                               value="{{ old('title_ar') }}" dir="rtl" required>
                        @error('title_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
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

                    <div class="col-md-6">
                        <label class="form-label">Case Study (English)</label>
                        <textarea name="case_study_en" class="form-control @error('case_study_en') is-invalid @enderror"
                                  rows="3">{{ old('case_study_en') }}</textarea>
                        @error('case_study_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Case Study (Arabic)</label>
                        <textarea name="case_study_ar" class="form-control @error('case_study_ar') is-invalid @enderror"
                                  rows="3" dir="rtl">{{ old('case_study_ar') }}</textarea>
                        @error('case_study_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Category <span class="text-danger">*</span></label>
                        <select name="category" class="form-select @error('category') is-invalid @enderror" required>
                            <option value="">Select category</option>
                            <option value="residential" {{ old('category') == 'residential' ? 'selected' : '' }}>Residential</option>
                            <option value="commercial" {{ old('category') == 'commercial' ? 'selected' : '' }}>Commercial</option>
                        </select>
                        @error('category') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Images (Multiple)</label>
                        <input type="file" name="images[]" class="form-control @error('images') is-invalid @enderror @error('images.*') is-invalid @enderror"
                               accept="image/*" multiple>
                        @error('images') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        @error('images.*') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        <small class="text-muted">You can select multiple images at once</small>
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
                    <a href="{{ route('admin.projects.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-check-lg me-1"></i> Save Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
