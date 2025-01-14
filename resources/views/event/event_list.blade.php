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