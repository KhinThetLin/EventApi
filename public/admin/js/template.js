 $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


function searchsingle()
{        
    var data=$("#form").serialize();
    console.log(data);
    $.ajax({
            type: "POST",
            url : "/event/search",
            data : data,
            success : function(e)
            {
                            
            $("#content").html(e); 
            
            }
        
        });
}




    





