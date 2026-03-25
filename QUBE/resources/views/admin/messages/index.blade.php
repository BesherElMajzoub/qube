@extends('layouts.admin')

@section('title', 'Messages - QUBE Admin')
@section('page-title', 'Messages')

@section('content')
<div class="data-table animate-in">
    <div class="table-header">
        <h5><i class="bi bi-envelope-fill me-2"></i>Contact Messages</h5>
        <div class="d-flex gap-2">
            <a href="{{ route('admin.messages.index', ['status' => 'all']) }}"
               class="btn btn-sm {{ !request('status') || request('status') == 'all' ? 'btn-primary' : 'btn-outline-secondary' }}">All</a>
            <a href="{{ route('admin.messages.index', ['status' => 'new']) }}"
               class="btn btn-sm {{ request('status') == 'new' ? 'btn-primary' : 'btn-outline-secondary' }}">New</a>
            <a href="{{ route('admin.messages.index', ['status' => 'read']) }}"
               class="btn btn-sm {{ request('status') == 'read' ? 'btn-primary' : 'btn-outline-secondary' }}">Read</a>
            <a href="{{ route('admin.messages.index', ['status' => 'responded']) }}"
               class="btn btn-sm {{ request('status') == 'responded' ? 'btn-primary' : 'btn-outline-secondary' }}">Responded</a>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($messages as $message)
                    <tr style="{{ $message->status === 'new' ? 'font-weight: 600; background: rgba(99,102,241,0.02);' : '' }}">
                        <td>{{ $message->id }}</td>
                        <td>
                            @if($message->status === 'new')
                                <i class="bi bi-circle-fill text-danger me-1" style="font-size: 0.5rem;"></i>
                            @endif
                            {{ $message->name }}
                        </td>
                        <td>{{ $message->phone }}</td>
                        <td>{{ $message->email ?? '-' }}</td>
                        <td>{{ Str::limit($message->message, 60) }}</td>
                        <td><span class="badge-status badge-{{ $message->status }}">{{ $message->status }}</span></td>
                        <td>{{ $message->created_at->format('M d, Y H:i') }}</td>
                        <td>
                            <div class="d-flex gap-1">
                                <a href="{{ route('admin.messages.show', $message) }}" class="btn btn-sm btn-outline-secondary" title="View">
                                    <i class="bi bi-eye"></i>
                                </a>
                                @if($message->status === 'new')
                                    <form action="{{ route('admin.messages.read', $message) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit" class="btn btn-sm btn-outline-success" title="Mark as Read">
                                            <i class="bi bi-check-lg"></i>
                                        </button>
                                    </form>
                                @endif
                                <form id="delete-message-{{ $message->id }}" action="{{ route('admin.messages.destroy', $message) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button" class="btn btn-sm btn-outline-danger" title="Delete"
                                            onclick="confirmDelete('delete-message-{{ $message->id }}')">
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
                                <i class="bi bi-envelope-open"></i>
                                <p>No messages found</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($messages->hasPages())
        <div class="p-3 d-flex justify-content-center">
            {{ $messages->links() }}
        </div>
    @endif
</div>
@endsection
