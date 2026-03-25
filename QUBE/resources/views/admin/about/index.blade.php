@extends('layouts.admin')

@section('title', 'About - QUBE Admin')
@section('page-title', 'About Section')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center mb-4">
                <h5 class="mb-0"><i class="bi bi-info-circle-fill me-2"></i>About Section</h5>
            </div>

            <form action="{{ route('admin.about.update') }}" method="POST">
                @csrf
                @method('PUT')

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Title (English) <span class="text-danger">*</span></label>
                        <input type="text" name="title_en" class="form-control @error('title_en') is-invalid @enderror"
                               value="{{ old('title_en', $about->title_en) }}" required>
                        @error('title_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Title (Arabic) <span class="text-danger">*</span></label>
                        <input type="text" name="title_ar" class="form-control @error('title_ar') is-invalid @enderror"
                               value="{{ old('title_ar', $about->title_ar) }}" dir="rtl" required>
                        @error('title_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (English)</label>
                        <textarea name="description_en" class="form-control @error('description_en') is-invalid @enderror"
                                  rows="8">{{ old('description_en', $about->description_en) }}</textarea>
                        @error('description_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Description (Arabic)</label>
                        <textarea name="description_ar" class="form-control @error('description_ar') is-invalid @enderror"
                                  rows="8" dir="rtl">{{ old('description_ar', $about->description_ar) }}</textarea>
                        @error('description_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>
                </div>

                <hr class="my-4">

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-check-lg me-1"></i> Update About
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
