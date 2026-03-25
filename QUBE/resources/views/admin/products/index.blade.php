@extends('layouts.admin')

@section('title', 'Products - QUBE Admin')
@section('page-title', 'Products')

@section('content')
<div class="data-table animate-in">
    <div class="table-header">
        <h5><i class="bi bi-box-seam-fill me-2"></i>All Products</h5>
        <div class="d-flex gap-2 flex-wrap">
            <form action="{{ route('admin.products.index') }}" method="GET" class="d-flex gap-2">
                <input type="text" name="search" class="form-control form-control-sm" placeholder="Search products..."
                       value="{{ request('search') }}" style="width: 200px; border-radius: 8px;">
                <button type="submit" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-search"></i>
                </button>
            </form>
            <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
                <i class="bi bi-plus-lg me-1"></i> Add Product
            </a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name (EN)</th>
                    <th>Name (AR)</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Featured</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($products as $product)
                    <tr>
                        <td>{{ $product->id }}</td>
                        <td>
                            @if($product->image)
                                <img src="{{ asset('storage/' . $product->image) }}" alt="{{ $product->name_en }}" class="product-img">
                            @else
                                <div class="product-img-placeholder">
                                    <i class="bi bi-image"></i>
                                </div>
                            @endif
                        </td>
                        <td class="fw-semibold">{{ $product->name_en }}</td>
                        <td dir="rtl">{{ $product->name_ar }}</td>
                        <td><span class="badge-status badge-{{ $product->category }}">{{ $product->category }}</span></td>
                        <td>{{ $product->price ? '$' . number_format($product->price, 2) : '-' }}</td>
                        <td>
                            @if($product->featured)
                                <i class="bi bi-star-fill text-warning"></i>
                            @else
                                <i class="bi bi-star text-muted"></i>
                            @endif
                        </td>
                        <td>{{ $product->created_at->format('M d, Y') }}</td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-sm btn-outline-secondary" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <form id="delete-product-{{ $product->id }}" action="{{ route('admin.products.destroy', $product) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Delete"
                                            onclick="confirmDelete('delete-product-{{ $product->id }}')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="9">
                            <div class="empty-state">
                                <i class="bi bi-box-seam"></i>
                                <p>No products found</p>
                                <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">Add Your First Product</a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($products->hasPages())
        <div class="p-3 d-flex justify-content-center">
            {{ $products->links() }}
        </div>
    @endif
</div>
@endsection
