@extends('admin-template')
@section('content')

<div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
           
            <div class="ibox-title">
                <h5>Event Lists</h5>
                <div class="ibox-tools">
                    <a href="{{ route('event.create') }}" class="btn btn-sm btn-primary" ><i class="fa fa-plus-circle"></i> Add New</a>
                </div>
            </div>         
            <div class="ibox-content">            
               <form id="form"> 
                @csrf
                    <div class="row"> 
                        <div class="col-md-4">
                            <div class="form-group"> 
                                <label>Start Date</label>
                                <input type="date" name="start_date" id="start_date" class="form-control" onchange="searchsingle()">
                                                
                            </div> 
                        </div> 
                        <div class="col-md-4">
                            <div class="form-group"> 
                                <label>End Date</label>
                                <input type="date" name="end_date" id="end_date" class="form-control" onchange="searchsingle()">
                                                
                            </div> 
                        </div> 
                        <div class="col-md-4">
                            <div class="form-group"> 
                                <label>Category</label>
                                <input type="text" name="category" id="category" class="form-control" onchange="searchsingle()">
                                                
                            </div> 
                        </div>
                            
                    </div>
                    <!-- <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-sm pull-right checkbox-toggle"><i class="fa fa-search"></i> search</button>
                </div>  -->
                </form>
                <div class="form-group">
                    <button type="submit" onclick="searchsingle()" class="btn btn-primary btn-sm pull-right checkbox-toggle"><i class="fa fa-search"></i> search</button>
                </div> 
                
            </div>
        </div>
    </div>
</div>
            <div>
               @include("flash_message")
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dataTables">
                        <thead>
                            
                            <tr>
                                <th class="text-center">No</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">Title</th>
                                <th class="text-center">Description</th>                 
                                <th class="text-center">Category</th>                 
                                <th class="text-center">Action</th>
                            </tr>
  
                        </thead>
                        <tbody id="content">
                        @php
                        $count = 1;
                        @endphp
                        @foreach($event as $list)
                            <tr>
                                <td class="text-right">{{ $count }}</td> 
                               
                                <td>{{ $list->date }}</td>
                                <td>{{ $list->title }}</td>
                                <td>{{ $list->description }}</td>
                                <td>{{ $list->category }}</td>        
                                
                                <td class="text-center">
                                        <div class="btn-group"> 
                                            <a href="" type="button" class="btn btn-default btn-xs" title="show"><i class="fa fa-reorder"></i></a>                                        
                                            <a href="{{ route('event.edit',$list->id) }}" type="button" class="btn btn-default btn-xs" title="Edit"><i class="fa fa-pencil"></i></a>
  
                                            <form action="{{ route('event.destroy', $list->id) }}" method="post">
                                                @csrf
                                                <input name="_method" type="hidden" value="DELETE">
                                                <button type="button" class="btn btn-default btn-xs" title="Delete" onclick="if (confirm('Are you sure to delete?')) { this.form.submit() } "><i class="fa fa-remove"></i></button>
                                            </form>                                            
                                        </div>
                                    
                                </td>
                            </tr>
                            @php
                            $count++;
                            @endphp
                        @endforeach
                    </tbody>
                    </table>
                    
                </div>
            </div>

@endsection
