@extends('layouts.admin')

@section('title', 'Edit FAQ')
@section('page-title', 'Edit FAQ')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="mb-0">Edit FAQ</h3>
    <a href="{{ route('admin.faqs.index') }}" class="btn btn-outline-secondary d-flex align-items-center gap-2">
        <i class="bi bi-arrow-left"></i> Back to FAQs
    </a>
</div>

<div class="card shadow-sm border-0 form-card">
    <div class="card-body p-4">
        <form action="{{ route('admin.faqs.update', $faq->id) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <label class="form-label">Question (English) <span class="text-danger">*</span></label>
                    <input type="text" name="question_en" class="form-control @error('question_en') is-invalid @enderror" value="{{ old('question_en', $faq->question_en) }}" required>
                    @error('question_en')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
                <div class="col-md-6">
                    <label class="form-label">Question (Arabic) <span class="text-danger">*</span></label>
                    <input type="text" name="question_ar" class="form-control @error('question_ar') is-invalid @enderror" value="{{ old('question_ar', $faq->question_ar) }}" dir="rtl" required>
                    @error('question_ar')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <label class="form-label">Answer (English) <span class="text-danger">*</span></label>
                    <textarea name="answer_en" rows="5" class="form-control @error('answer_en') is-invalid @enderror" required>{{ old('answer_en', $faq->answer_en) }}</textarea>
                    @error('answer_en')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
                <div class="col-md-6">
                    <label class="form-label">Answer (Arabic) <span class="text-danger">*</span></label>
                    <textarea name="answer_ar" rows="5" class="form-control @error('answer_ar') is-invalid @enderror" dir="rtl" required>{{ old('answer_ar', $faq->answer_ar) }}</textarea>
                    @error('answer_ar')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <label class="form-label">Display Order</label>
                    <input type="number" name="order" class="form-control @error('order') is-invalid @enderror" value="{{ old('order', $faq->order) }}">
                    <div class="form-text">Lower numbers appear first.</div>
                    @error('order')<div class="invalid-feedback">{{ $message }}</div>@enderror
                </div>
                <div class="col-md-6">
                    <label class="form-label d-block">Status</label>
                    <div class="form-check form-switch mt-2">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" value="1" {{ old('is_active', $faq->is_active) ? 'checked' : '' }}>
                        <label class="form-check-label" for="isActive">Active (Visible on website)</label>
                    </div>
                </div>
            </div>

            <hr class="my-4">

            <div class="text-end">
                <button type="submit" class="btn btn-primary px-4">Update FAQ</button>
            </div>
        </form>
    </div>
</div>
@endsection
