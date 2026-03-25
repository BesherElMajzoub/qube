@extends('layouts.admin')

@section('title', 'Projects - QUBE Admin')
@section('page-title', 'Projects')

@section('content')
<div class="data-table animate-in">
    <div class="table-header">
        <h5><i class="bi bi-building me-2"></i>All Projects</h5>
        <div class="d-flex gap-2 flex-wrap">
            <form action="{{ route('admin.projects.index') }}" method="GET" class="d-flex gap-2">
                <input type="text" name="search" class="form-control form-control-sm" placeholder="Search projects..."
                       value="{{ request('search') }}" style="width: 200px; border-radius: 8px;">
                <button type="submit" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-search"></i>
                </button>
            </form>
            <a href="{{ route('admin.projects.create') }}" class="btn btn-sm btn-primary">
                <i class="bi bi-plus-lg me-1"></i> Add Project
            </a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Images</th>
                    <th>Title (EN)</th>
                    <th>Title (AR)</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($projects as $project)
                    <tr>
                        <td>{{ $project->id }}</td>
                        <td>
                            @if($project->images->count() > 0)
                                <div class="d-flex gap-1">
                                    @foreach($project->images->take(3) as $img)
                                        <img src="{{ asset('storage/' . $img->image_path) }}" class="product-img" alt="Project image">
                                    @endforeach
                                    @if($project->images->count() > 3)
                                        <div class="product-img-placeholder" style="font-size:0.7rem;">
                                            +{{ $project->images->count() - 3 }}
                                        </div>
                                    @endif
                                </div>
                            @else
                                <div class="product-img-placeholder">
                                    <i class="bi bi-images"></i>
                                </div>
                            @endif
                        </td>
                        <td class="fw-semibold">{{ $project->title_en }}</td>
                        <td dir="rtl">{{ $project->title_ar }}</td>
                        <td><span class="badge-status badge-{{ $project->category }}">{{ $project->category }}</span></td>
                        <td>
                            @if($project->featured)
                                <i class="bi bi-star-fill text-warning"></i>
                            @else
                                <i class="bi bi-star text-muted"></i>
                            @endif
                        </td>
                        <td>{{ $project->created_at->format('M d, Y') }}</td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.projects.edit', $project) }}" class="btn btn-sm btn-outline-secondary" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <form id="delete-project-{{ $project->id }}" action="{{ route('admin.projects.destroy', $project) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Delete"
                                            onclick="confirmDelete('delete-project-{{ $project->id }}')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8">
                            <div class="empty-state">
                                <i class="bi bi-building"></i>
                                <p>No projects found</p>
                                <a href="{{ route('admin.projects.create') }}" class="btn btn-sm btn-primary">Add Your First Project</a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($projects->hasPages())
        <div class="p-3 d-flex justify-content-center">
            {{ $projects->links() }}
        </div>
    @endif
</div>
@endsection
