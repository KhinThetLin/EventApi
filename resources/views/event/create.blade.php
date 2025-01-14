@extends('admin-template')
@section('content')

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox col-lg-8 mx-auto">
                <div class="ibox-title">
                    <h1>Event Create Form</h1>
                    <div class="ibox-tools">
                     
                        <a href="{{ route('event.index') }}" class="btn btn-sm pt-2 btn-primary" ><i class="fa fa-reply"></i> Back</a>
  
                    </div>
                </div>
                <div class="ibox-content">
            
                    <form action="{{ route('event.store') }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
                       
                        @csrf
         
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label >Date </label>
                                            <input type="date" name="date" placeholder="Enter Date" class="form-control {{ $errors->has('date') ? 'is-invalid':'' }}" >
                                            @if($errors->has('date') || 1)
                                                <span class="error invalid-feedback">{{ $errors->first('date') }}</span>
                                            @endif  
                                    </div>
                                    <div class="form-group">
                                        <label >Date </label>
                                            <input type="text" name="title" placeholder="Enter Title" class="form-control {{ $errors->has('title') ? 'is-invalid':'' }}" >
                                            @if($errors->has('title') || 1)
                                                <span class="error invalid-feedback">{{ $errors->first('title') }}</span>
                                            @endif  
                                    </div>
                                    
                                    <div class="form-group">
                                        <label >Description</label>
                                       
                                            <textarea name="description" class="form-control {{ $errors->has('name') ? 'is-invalid':'' }}"></textarea>
                                            @if($errors->has('description') || 1)
                                                <span class="error invalid-feedback">{{ $errors->first('description') }}</span>
                                            @endif
                                       
                                    </div>
                                    <div class="form-group">
                                        <label >Date </label>
                                            <input type="text" name="category" placeholder="Enter category" class="form-control {{ $errors->has('category') ? 'is-invalid':'' }}" >
                                            @if($errors->has('category') || 1)
                                                <span class="error invalid-feedback">{{ $errors->first('category') }}</span>
                                            @endif  
                                    </div>    
                                </div>        
   
                            </div>                       
                              
                            <div class="row">
                                <div class="col-md-6"></div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary float-right">Save</button>
                                        <a href="{{ route('event.index') }}" class="btn btn-default float-right mr-3"> Cancel</a>
                                    </div>
                                </div>
                            </div> 
                        </div> 
  
                    </form>
                </div>
            </div>
        </div>
    </div>

   
 
 @endsection
