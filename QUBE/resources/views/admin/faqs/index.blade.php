@extends('layouts.admin')

@section('title', 'Manage FAQs')
@section('page-title', 'Manage FAQs')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="mb-0 text-gray-800">Frequently Asked Questions</h3>
    <a href="{{ route('admin.faqs.create') }}" class="btn btn-primary d-flex align-items-center gap-2">
        <i class="bi bi-plus-lg"></i> Add New FAQ
    </a>
</div>

<div class="card shadow-sm border-0 data-table">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th width="50">Order</th>
                        <th>Question (EN)</th>
                        <th>Question (AR)</th>
                        <th>Status</th>
                        <th width="150" class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($faqs as $faq)
                    <tr>
                        <td>{{ $faq->order }}</td>
                        <td class="text-truncate" style="max-width: 200px;">
                            <div class="fw-bold">{{ $faq->question_en }}</div>
                            <small class="text-muted text-truncate d-block">{{ strip_tags($faq->answer_en) }}</small>
                        </td>
                        <td class="text-truncate" style="max-width: 200px;" dir="rtl">
                            <div class="fw-bold">{{ $faq->question_ar }}</div>
                            <small class="text-muted text-truncate d-block">{{ strip_tags($faq->answer_ar) }}</small>
                        </td>
                        <td>
                            @if($faq->is_active)
                                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Active</span>
                            @else
                                <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3">Inactive</span>
                            @endif
                        </td>
                        <td class="text-end">
                            <div class="btn-group">
                                <a href="{{ route('admin.faqs.edit', $faq->id) }}" class="btn btn-sm btn-outline-primary" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <form action="{{ route('admin.faqs.destroy', $faq->id) }}" method="POST" class="d-inline" id="delete-form-{{ $faq->id }}">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="confirmDelete('delete-form-{{ $faq->id }}')" title="Delete">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="text-center py-5">
                            <div class="empty-state">
                                <i class="bi bi-patch-question mb-3 d-block text-muted" style="font-size: 3rem;"></i>
                                <h5 class="text-muted mb-0">No FAQs found</h5>
                                <p class="text-muted mb-3">Get started by creating your first frequently asked question.</p>
                                <a href="{{ route('admin.faqs.create') }}" class="btn btn-primary">Add FAQ</a>
                            </div>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
