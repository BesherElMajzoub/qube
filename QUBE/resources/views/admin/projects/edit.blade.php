@extends('layouts.admin')

@section('title', 'Edit Project - QUBE Admin')
@section('page-title', 'Edit Project')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0"><i class="bi bi-pencil me-2"></i>Edit Project</h5>
                <a href="{{ route('admin.projects.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>

            <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Title (English) <span class="text-danger">*</span></label>
                        <input type="text" name="title_en" class="form-control @error('title_en') is-invalid @enderror"
                               value="{{ old('title_en', $project->title_en) }}" required>
                        @error('title_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Title (Arabic) <span class="text-danger">*</span></label>
                        <input type="text" name="title_ar" class="form-control @error('title_ar') is-invalid @enderror"
                               value="{{ old('title_ar', $project->title_ar) }}" dir="rtl" required>
                        @error('title_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (English)</label>
                        <textarea name="description_en" class="form-control @error('description_en') is-invalid @enderror"
                                  rows="4">{{ old('description_en', $project->description_en) }}</textarea>
                        @error('description_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (Arabic)</label>
                        <textarea name="description_ar" class="form-control @error('description_ar') is-invalid @enderror"
                                  rows="4" dir="rtl">{{ old('description_ar', $project->description_ar) }}</textarea>
                        @error('description_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Case Study (English)</label>
                        <textarea name="case_study_en" class="form-control @error('case_study_en') is-invalid @enderror"
                                  rows="3">{{ old('case_study_en', $project->case_study_en) }}</textarea>
                        @error('case_study_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Case Study (Arabic)</label>
                        <textarea name="case_study_ar" class="form-control @error('case_study_ar') is-invalid @enderror"
                                  rows="3" dir="rtl">{{ old('case_study_ar', $project->case_study_ar) }}</textarea>
                        @error('case_study_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Category <span class="text-danger">*</span></label>
                        <select name="category" class="form-select @error('category') is-invalid @enderror" required>
                            <option value="residential" {{ old('category', $project->category) == 'residential' ? 'selected' : '' }}>Residential</option>
                            <option value="commercial" {{ old('category', $project->category) == 'commercial' ? 'selected' : '' }}>Commercial</option>
                        </select>
                        @error('category') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Add More Images</label>
                        <input type="file" name="images[]" class="form-control @error('images') is-invalid @enderror @error('images.*') is-invalid @enderror"
                               accept="image/*" multiple>
                        @error('images') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        @error('images.*') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <!-- Current Images -->
                    @if($project->images->count() > 0)
                        <div class="col-12">
                            <label class="form-label">Current Images</label>
                            <p class="text-muted" style="font-size: 0.8rem;">Check the box to delete an image</p>
                            <div class="image-gallery">
                                @foreach($project->images as $image)
                                    <div class="image-gallery-item">
                                        <img src="{{ asset('storage/' . $image->image_path) }}" alt="Project image">
                                        <label class="delete-overlay" style="opacity:0.8;cursor:pointer;">
                                            <input type="checkbox" name="delete_images[]" value="{{ $image->id }}" style="display:none;">
                                            <i class="bi bi-trash text-white fs-5"></i>
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1"
                                   {{ old('featured', $project->featured) ? 'checked' : '' }}>
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
                        <i class="bi bi-check-lg me-1"></i> Update Project
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@push('scripts')
<script>
    // Toggle delete overlay on click
    document.querySelectorAll('.image-gallery-item .delete-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            this.closest('.image-gallery-item').style.opacity = checkbox.checked ? '0.4' : '1';
        });
    });
</script>
@endpush
@endsection
