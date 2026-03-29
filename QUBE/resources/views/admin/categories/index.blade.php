@extends('layouts.admin')

@section('title', 'Categories - QUBE Admin')
@section('page-title', 'Categories')

@section('content')
<div class="row">
    <div class="col-12 col-lg-8 animate-in delay-1">
        <div class="card bg-white shadow-sm border-0 rounded-4 mb-4">
            <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h5 class="mb-0"><i class="bi bi-tags me-2"></i>All Categories</h5>
                </div>

                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Name (EN)</th>
                                <th>Name (AR)</th>
                                <th>Type</th>
                                <th class="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($categories as $category)
                            <tr>
                                <td>{{ $category->name_en }}</td>
                                <td dir="rtl">{{ $category->name_ar }}</td>
                                <td>
                                    <span class="badge bg-{{ $category->type == 'product' ? 'primary' : 'success' }} bg-opacity-10 text-{{ $category->type == 'product' ? 'primary' : 'success' }}">
                                        {{ ucfirst($category->type) }}
                                    </span>
                                </td>
                                <td class="text-end">
                                    <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" class="d-inline-block" onsubmit="return confirm('Are you sure?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="4" class="text-center py-4 text-muted">No categories found.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-12 col-lg-4 animate-in delay-2">
        <div class="card bg-white shadow-sm border-0 rounded-4">
            <div class="card-body p-4">
                <h5 class="mb-4"><i class="bi bi-plus-circle me-2"></i>Add Category</h5>
                <form action="{{ route('admin.categories.store') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label">Name (English)</label>
                        <input type="text" name="name_en" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name (Arabic)</label>
                        <input type="text" name="name_ar" class="form-control" dir="rtl" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type</label>
                        <select name="type" class="form-select" required>
                            <option value="product">Product</option>
                            <option value="project">Project</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Save Category</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
