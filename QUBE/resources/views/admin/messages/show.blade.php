@extends('layouts.admin')

@section('title', 'View Message - QUBE Admin')
@section('page-title', 'View Message')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h5 class="mb-0"><i class="bi bi-envelope-open me-2"></i>Message Details</h5>
                <a href="{{ route('admin.messages.index') }}" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-arrow-left me-1"></i> Back
                </a>
            </div>

            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <div class="form-control bg-light" style="pointer-events:none;">{{ $message->name }}</div>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Phone</label>
                    <div class="form-control bg-light" style="pointer-events:none;">{{ $message->phone }}</div>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <div class="form-control bg-light" style="pointer-events:none;">{{ $message->email ?? 'Not provided' }}</div>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Status</label>
                    <div>
                        <span class="badge-status badge-{{ $message->status }}">{{ $message->status }}</span>
                    </div>
                </div>

                <div class="col-12">
                    <label class="form-label">Message</label>
                    <div class="form-control bg-light" style="pointer-events:none; min-height:120px; white-space:pre-wrap;">{{ $message->message }}</div>
                </div>

                <div class="col-12">
                    <label class="form-label">Received</label>
                    <div class="text-muted">{{ $message->created_at->format('F d, Y \a\t h:i A') }}</div>
                </div>
            </div>

            <hr class="my-4">

            <div class="d-flex justify-content-between">
                <form id="delete-msg" action="{{ route('admin.messages.destroy', $message) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="button" class="btn btn-outline-danger btn-sm" onclick="confirmDelete('delete-msg')">
                        <i class="bi bi-trash me-1"></i> Delete Message
                    </button>
                </form>

                @if($message->status === 'new')
                    <form action="{{ route('admin.messages.read', $message) }}" method="POST">
                        @csrf
                        @method('PATCH')
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="bi bi-check-lg me-1"></i> Mark as Read
                        </button>
                    </form>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
