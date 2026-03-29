@extends('layouts.admin')

@section('title', 'Settings - QUBE Admin')
@section('page-title', 'Settings')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-lg-8">
        <div class="form-card animate-in">
            <div class="d-flex align-items-center mb-4">
                <h5 class="mb-0"><i class="bi bi-gear-fill me-2"></i>Site Settings</h5>
            </div>

            <form action="{{ route('admin.settings.update') }}" method="POST">
                @csrf
                @method('PUT')

                <div class="row g-3">
                    <div class="col-12">
                        <h6 class="text-muted mb-3" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;">
                            <i class="bi bi-telephone me-1"></i> Contact Info
                        </h6>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Phone Number 1</label>
                        <input type="text" name="phone1" class="form-control @error('phone1') is-invalid @enderror"
                               value="{{ old('phone1', $settings['phone1']) }}" placeholder="+966 xxx xxx xxxx">
                        @error('phone1') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Phone Number 2</label>
                        <input type="text" name="phone2" class="form-control @error('phone2') is-invalid @enderror"
                               value="{{ old('phone2', $settings['phone2']) }}" placeholder="+966 xxx xxx xxxx">
                        @error('phone2') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Mobile Number</label>
                        <input type="text" name="mobile" class="form-control @error('mobile') is-invalid @enderror"
                               value="{{ old('mobile', $settings['mobile']) }}" placeholder="+966 xxx xxx xxxx">
                        @error('mobile') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">WhatsApp Number</label>
                        <input type="text" name="whatsapp" class="form-control @error('whatsapp') is-invalid @enderror"
                               value="{{ old('whatsapp', $settings['whatsapp']) }}" placeholder="+966 xxx xxx xxxx">
                        @error('whatsapp') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                               value="{{ old('email', $settings['email']) }}" placeholder="info@qube.com">
                        @error('email') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-12 mt-4">
                        <h6 class="text-muted mb-3" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;">
                            <i class="bi bi-geo-alt me-1"></i> Address
                        </h6>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Address (English)</label>
                        <textarea name="address_en" class="form-control @error('address_en') is-invalid @enderror"
                                  rows="3">{{ old('address_en', $settings['address_en']) }}</textarea>
                        @error('address_en') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Address (Arabic)</label>
                        <textarea name="address_ar" class="form-control @error('address_ar') is-invalid @enderror"
                                  rows="3" dir="rtl">{{ old('address_ar', $settings['address_ar']) }}</textarea>
                        @error('address_ar') <div class="invalid-feedback">{{ $message }}</div> @enderror
                    </div>
                </div>

                <hr class="my-4">

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-check-lg me-1"></i> Save Settings
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
