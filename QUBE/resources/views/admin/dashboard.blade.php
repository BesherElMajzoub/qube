@extends('layouts.admin')

@section('title', 'Dashboard - QUBE Admin')
@section('page-title', 'Dashboard')

@section('content')
<div class="row g-3 mb-4">
    <!-- Visitors Today -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon purple">
                <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['visitors_today']) }}</div>
            <div class="stat-label">Visitors Today</div>
        </div>
    </div>

    <!-- Clicks Today -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon blue">
                <i class="bi bi-cursor-fill"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['clicks_today']) }}</div>
            <div class="stat-label">Clicks Today</div>
        </div>
    </div>

    <!-- Total Products -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon green">
                <i class="bi bi-box-seam-fill"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['total_products']) }}</div>
            <div class="stat-label">Total Products</div>
        </div>
    </div>

    <!-- Total Projects -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon orange">
                <i class="bi bi-building"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['total_projects']) }}</div>
            <div class="stat-label">Total Projects</div>
        </div>
    </div>

    <!-- Total Messages -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon red">
                <i class="bi bi-envelope-fill"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['total_messages']) }}</div>
            <div class="stat-label">Total Messages</div>
        </div>
    </div>

    <!-- Unread Messages -->
    <div class="col-12 col-sm-6 col-xl-4 animate-in">
        <div class="stat-card">
            <div class="stat-icon red">
                <i class="bi bi-envelope-exclamation-fill"></i>
            </div>
            <div class="stat-value">{{ number_format($stats['unread_messages']) }}</div>
            <div class="stat-label">Unread Messages</div>
        </div>
    </div>
</div>

<!-- Recent Messages -->
<div class="data-table animate-in">
    <div class="table-header">
        <h5><i class="bi bi-envelope-fill me-2"></i>Recent Messages</h5>
        <a href="{{ route('admin.messages.index') }}" class="btn btn-sm btn-outline-secondary">View All</a>
    </div>
    <div class="table-responsive">
        <table class="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse($recent_messages as $msg)
                    <tr>
                        <td class="fw-semibold">{{ $msg->name }}</td>
                        <td>{{ $msg->phone }}</td>
                        <td>{{ Str::limit($msg->message, 50) }}</td>
                        <td>{{ $msg->created_at->diffForHumans() }}</td>
                        <td><span class="badge-status badge-{{ $msg->status }}">{{ $msg->status }}</span></td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center py-4 text-muted">
                            <i class="bi bi-envelope-open" style="font-size:1.5rem;"></i>
                            <br>No new messages
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
