function baseURL(url='')
{	
	var host = window.location.host;
	var base = window.location.origin;
	var pathArray = window.location.pathname.split( '/' );
	if (host=='localhost') {
		var baseurl = base+'/'+pathArray[1];
	} else {
		var baseurl = base;
	}
	if (url=='') {
		return baseurl+'/admin/';
	} 
	if (url!='') {
		return baseurl+'/admin/'+url;
	}
}
!function(e){
	$.noti = function(status, position, respon, title=''){
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-"+position,
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        toastr[status](respon, title);   
    }
    /*
	* Plugins
    */
	$.plugin = function(){
		$('[data-toggle="tooltip"]').tooltip();
		$('[stack-select="true"]').selectpicker();
		$('[stack-sortable="true"]').sortable({
		  	containerSelector: 'table',
		  	itemPath: '> tbody',
		  	itemSelector: 'tr',
		  	placeholder: '<tr class="placeholder"/>'
		});
		$('[stack-note]').summernote({
			height:300,
			toolbar: [
	          ['style', ['style']],
	          ['font', ['bold', 'underline', 'clear']],
	          ['fontname', ['fontname']],
	          ['color', ['color']],
	          ['para', ['ul', 'ol', 'paragraph']],
	          ['insert', ['link']],
	        ]
		});
		$('[stack-note-flink]').summernote({
			height:250,
			placeholder: "အကြောင်းအရာ ရိုက်ထည့်ပါ",
			toolbar: [
	          ['fontname', ['fontname']],
	          ['font', ['bold', 'underline', 'clear']],
	          ['para', ['ul', 'ol', 'paragraph']],
	          ['insert', ['table','link']],
	        ]
		});
		
		$('#fsc_restrict_status').summernote({
			height:450,
			placeholder: "ကန့်ကွက်ရန်မရှိကြောင်းအကြောင်းကြားစာ ရိုက်ထည့်ရန်",
			toolbar: [
	          ['style', ['style']],
	          ['font', ['bold', 'underline', 'clear']],
	          ['fontname', ['fontname']],
	          ['color', ['color']],
	          ['para', ['ul', 'ol', 'paragraph']],
	          ['insert', ['link']],
	        ]
		});
	}
	$.plugin();
	/*
	* Page Load
	*/
	$.pageLoad = function(url, id, other){
		$.ajax({
		    url: url,
		    dataType: "html",
		    beforeSend: function(){
		        $('#'+id).html('<div class="stack-loading-container"><div class="stack-dual-ring"></div></div>');
		    },
		    success: function(results){
		    	$('#'+id).hide().html(results).fadeIn();
		    	// $('.selectpicker').selectpicker();
		    	if ($('#'+id).find('[stack-window-loads]').length) {
		    		$.ajaxReload();
		    	}
		    }
		});
	}
	$.fragmentLoad = function(url, id, load=true, callback){
		$.ajax({
		    url: url,
		    dataType: "html",
		    beforeSend: function(){
		    	if (load)
		        	$(id).html('<div class="stack-loading-container"><div class="stack-dual-ring"></div></div>');
		    },
		    success: function(results){
		    	$(id).hide().html(results).fadeIn();
		    	if ($(id).find('[stack-window-loads]').length) {
		    		$.ajaxReload();
		    	}
				$.plugin();
		    }
		});
	}
	/*
	* Page Load Global
	*/
	$.ajaxReload = function(){
		$('body').find('[stack-window-loads*="page-"]').each(function(){
			var pUrl = $(this).attr('stack-window-loads');
			if (pUrl === undefined) {
				pUrl = $(this).parent().attr('stack-window-loads');
			}
			var oUrl = pUrl.replace('page-', '');
			var regexp = new RegExp('-', 'g');
	        var lUrl = oUrl.replace(regexp, '/');
	        var target = $(this).attr('target');
			var rURL = baseURL(lUrl);
			$.fragmentLoad(rURL, target);
		});
	}
	$(window).on('load', function(){
		$.ajaxReload();
	});
	/*
	* Change Page
	*/
	$('body').on('click', '[stack-page*="page-"]', function(){
		var target = $(this).attr('stack-target');
		var pUrl = $(this).attr('stack-page');
		if (pUrl === undefined) {
			pUrl = $(this).parent().attr('stack-page');
		}
		var oUrl = pUrl.replace('page-', '');
		var regexp = new RegExp('-', 'g');
        var lUrl = oUrl.replace(regexp, '/');
		var rURL = baseURL(lUrl);
		$.fragmentLoad(rURL, target);
	});
	/*
	* Modal
	*/
	$(document).on('click', '[stack-modal*=page-]', function(e){
		var url = $(this).attr('stack-modal');
		var size = $(this).attr('stack-size');
		if (url === undefined) {
			url = $(this).parent().attr('stack-modal');
		}
		if (size===''||size===undefined) {
			size = '';
		} else {
			size = size;
		}
		var oUrl = url.replace('page-', '');
		var regexp = new RegExp('-', 'g');
        var lUrl = oUrl.replace(regexp, '/');
		var rURL = baseURL(lUrl);
		$('#stack-replace-main').addClass(size);
		$.fragmentLoad(rURL, '#stack-replace-main', false);
		$('#stack-modal').modal('show');
	});
	$(document).on('click', '[stack-dismiss="modal"]', function(e){
		$('#stack-modal').modal('hide');
	});
		
	/*
	* Form Submit
	*/
	$(document).on('click', '[stack-submit]', function(e){
		var form = $(e.target).closest('form');
	    var can = '';
	    var a = 0;
	    var take = '';
	    var requireddd = $('input,textarea,select').filter('[required]:visible');
	    form.find(requireddd).each(function(){
	        var txt = '* This Field is Required.';
	        a++;
	        if(a == 1){
	            take = 'scroll';
	        }
	        var here = $(this);
	        if($.trim(here.val()) == ''){
	            if(!here.is('select')){
	                here.css({borderColor: 'red'});
	                if(here.attr('type') == 'number'){
	                    txt = '* This Field is Number Required.';
	                }   
	                if (here.closest('div').hasClass('input-group')) {               
		                if(here.closest('div.input-group').parent().find('.require_alert').length){

		                } else {
		                    here.closest('div.input-group').parent().append(''
		                        +'  <span id="'+take+'" class="label label-danger require_alert" >'
		                        +'      '+txt
		                        +'  </span>'
		                    );
		                }
		            } else {
		            	if(here.closest('div').find('.require_alert').length){

		                } else {
		                    here.closest('div').append(''
		                        +'  <span id="'+take+'" class="label label-danger require_alert" >'
		                        +'      '+txt
		                        +'  </span>'
		                    );
		                }
		            }
	            } else if(here.is('select')){
	                if (here.closest('div.bootstrap-select').length) {
	                	here.closest('div.bootstrap-select').css({borderColor: 'red'});
		                if(here.closest('div.bootstrap-select').parent().find('.require_alert').length){

		                } else {
		                    here.closest('div.bootstrap-select').parent().append(''
		                        +'  <span id="'+take+'" class="label label-danger require_alert" >'
		                        +'      * Please Choose One'
		                        +'  </span>'
		                    );
		                }
		            } else {
		            	here.css({borderColor: 'red'});
		                if(here.closest('div').parent().find('.require_alert').length){

		                } else {
		                    here.closest('div').parent().append(''
		                        +'  <span id="'+take+'" class="label label-danger require_alert" >'
		                        +'      * Please Choose One'
		                        +'  </span>'
		                    );
		                }
		            }

	            }
	            here.first().focus();
	            can = 'no';
	        } else {
	            here.removeAttr('style');
	            here.closest('div').find('.require_alert').remove();
	            here.closest('div').parent().find('.require_alert').remove();
	            here.closest('div.bootstrap-select').removeAttr('style');
	            here.closest('div.bootstrap-select').parent().find('.require_alert').remove();
	        }
	        take = '';
	    });

	    if(can !== 'no'){
	        var formid = form;
	        var formdata = false;
	        var aciton = formid.attr('action');
	        if (window.FormData){
	            formdata = new FormData(formid[0]);
	        }
	        $.ajax({
	            type    : "POST",
	            dataType: "json",
	            url     : aciton,
	            data    : formdata ? formdata : formid.serialize(),
	            cache       : false,
	            contentType : false,
	            processData : false,
	            beforeSend: function(){
	                $(e.target).prop('disabled', true);
	            },
	            success: function(res){
	                if(res.status){
	                    $.noti('success', 'top-right', res.message, res.title);
	                    $(e.target).prop('disabled', false);
	                    $('[stack-dismiss="modal"]').trigger('click');
	                    if (res.reload) {
	                    	setTimeout(function(){ window.location.href=window.location.href }, 1000);
	                    } else {
	                    	$.ajaxReload();
	                    }
	                } else if(res.status===false) {
	                    $.noti('error', 'top-right', res.message, res.title);
	                    $(e.target).prop('disabled', false);
	                    if (res.reload) {
	                    	setTimeout(function(){ window.location.href=window.location.href }, 1000);
	                    } else {
	                    	$.ajaxReload();
	                    }
	                } else {
                	 	$.noti('error', 'top-right', res, 'Error !!');
	                	$(e.target).prop('disabled', false);
	                }
	            },
	            error: function(e) {
	                console.log(e);
	            }
	        });
	    } else {
	        return false;
	    }
	});
	$(document).on('change', '[stack-change]', function(){
		var target = $(this).attr('stack-target');
		var func = $(this).attr('stack-change');
		var thisval = $(this).val();
		var url = 'crud/'+func+'/'+thisval;
		var rURL = baseURL(url);
		$.fragmentLoad(rURL, target);
	});
	$(document).on('change click keypress', '[stack-show]', function(){
		var target = $(this).attr('stack-show');
		$(target).show();
	});
	/*
	* Image Preview
	*/
	$(document).on('change', '[stack-preview-img]', function(e){

		var targetid = $(e.target).attr('stack-preview-img');
		var multiple = $(e.target).attr('multiple');
	    $(e.target.files).each(function () {
	        var reader = new FileReader();
	        reader.readAsDataURL(this);
	        reader.onload = function (e) {
	        	var tid = targetid;
	        	var mut = multiple;
	            var output = "<img src='" + e.target.result + "'>";
	            $(targetid).addClass('preview');
	            if (mut=='multiple') {
	          		$(targetid).append("<div style='float:left;border:2px solid #5fbeaa;padding:2px;margin:2px;'>"+output+"</div>");
	          	} else {
	          		$(targetid).html("<div style='float:left;border:2px solid #5fbeaa;padding:2px;margin:2px;'>"+output+"</div>");
	          	}
	        }
	    });
	});
	/*
	* Confirm
	*/
	$('body').on('click', '[stack-confirm]', function(e){
		var $this = $(this);
		var pUrl = $this.attr('stack-confirm');
		var oUrl = pUrl.replace('page-', '');
		var regexp = new RegExp('-', 'g');
        var lUrl = oUrl.replace(regexp, '/');
		var rURL = baseURL(lUrl);

		var c = confirm("Action လုပ်မှာသေချာလား ?");
    	if (c) {
    		$.ajax({
				type: 'GET',
			    url: rURL,
			    dataType: "html",
			    beforeSend: function(){

			    },
			    success: function(results){
			    	window.location.reload();
			    }
			});
    	}
		
	});
	/*
	* Delete
	*/
	$('body').on('click', '[stack-delete]', function(e){
		var title = $(this).attr('stack-title');
		var message = $(this).attr('stack-message');
		var size = $(this).attr('stack-size');
		if (size!=''&&size!=undefined) {
			size = size;
		} else {
			size = "small";
		}
		if (title!=''&&title!=undefined) {
			title = title;
		} else {
			title = "Destroy planet?";
		}
		if (message!=''&&message!=undefined) {
			message = message;
		} else {
			message = "Are you sure?";
		}
		bootbox.confirm({ 
		    size: size,
		    title: title,
		    message: message,
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Delete'
		        }
		    },
		    callback: function(result){ 
		    	if (result) {
		    	var target = $this.attr('stack-target');
					var pUrl = $this.attr('stack-status');
					var oUrl = pUrl.replace('page-', '');
					var regexp = new RegExp('-', 'g');
			        var lUrl = oUrl.replace(regexp, '/');
					var rURL = baseURL(lUrl);
					$.ajax({
					    url: rURL,
					    type : "GET",
					    dataType: "json",
					    success: function(res){
					    	
					    	if(res.status){
			                    $.noti('success', 'top-right', res.message, res.title);
			                    if (res.reload) {
			                    	window.location.href=window.location.href;
			                    } else {
			                    	$.ajaxReload();
			                    }
			                } else if(res.status===false) {
			                    $.noti('error', 'top-right', res.message, res.title);
			                    $(e.target).prop('disabled', false);
			                } else {
		                	 	$.noti('error', 'top-right', res, 'Error !!');
			                	$(e.target).prop('disabled', false);
			                }

							$.plugin();
					    }
					});
		    	}
		    }
		});
	});
	/*
	* Confirm
	*/

	$('body').on('click', '[stack-status]', function(e){
		var $this = $(this);
		var title = $(this).attr('stack-title');
		var message = $(this).attr('stack-message');
		var size = $(this).attr('stack-size');
		if (size!=''&&size!=undefined) {
			size = size;
		} else {
			size = "small";
		}
		if (title!=''&&title!=undefined) {
			title = title;
		} else {
			title = null;
		}
		if (message!=''&&message!=undefined) {
			message = message;
		} else {
			message = "Are you sure?";
		}
		bootbox.confirm({ 
		    size: size,
		    title: title,
		    message: message,
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Confirm'
		        }
		    },
		    callback: function(result){
		    	if (result) {
		    		var target = $this.attr('stack-target');
					var pUrl = $this.attr('stack-status');
					var oUrl = pUrl.replace('page-', '');
					var regexp = new RegExp('-', 'g');
			        var lUrl = oUrl.replace(regexp, '/');
					var rURL = baseURL(lUrl);
					$.ajax({
					    url: rURL,
					    type : "GET",
					    dataType: "json",
					    success: function(res){
					    	
					    	if(res.status){
			                    $.noti('success', 'top-right', res.message, res.title);
			                    if (res.reload) {
			                    	window.location.href=window.location.href;
			                    } else {
			                    	$.ajaxReload();
			                    }
			                } else if(res.status===false) {
			                    $.noti('error', 'top-right', res.message, res.title);
			                    $(e.target).prop('disabled', false);
			                } else {
		                	 	$.noti('error', 'top-right', res, 'Error !!');
			                	$(e.target).prop('disabled', false);
			                }

							$.plugin();
					    }
					});
		    	}
		    }
		});
	});

	$('body').on('click', '[stack-click]', function(){
		var thisv = $(this).attr('stack-click');
		if (thisv==='active') {
			$(this).closest('.stack-main').find('[stack-click]').removeClass('active');
			$(this).addClass('active');
		}
	});

	/*
	* stack service
	*/
	$('body').on('click', '[stack-service]', function(e){
		var $this = $(this);
		var pUrl = $this.attr('stack-service');
		var oUrl = pUrl.replace('page-', '');
		var regexp = new RegExp('-', 'g');
        var lUrl = oUrl.replace(regexp, '/');
		var rURL = baseURL(lUrl);
		console.log(pUrl);
    	if (rURL) {
    		$.ajax({
				type: 'GET',
			    url: rURL,
			    dataType: "json",
			    beforeSend: function(){

			    },
			    success: function(results){
			    	// var respon = JSON.parse(results);
			    	// console.log(respon);
			    	// $('#amount').val(results.amount);
			    	$("input[name='amount']").val(results.amount);
			    	 // $("#amount").attr("value", results.amount);
			    	$('#service-title').html(results.title);
			    	$('#service-amount').html(results.amount_mm);
			    }
			});
    	}
		
	});
	/* check all*/
	$('body').on('click', '[stack-check]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check');
		if($('[stack-check="'+id+'"]').is(":checked")){
        	// $('[stack-check-view="'+id+'"]').prop("checked",true);
        	$('[stack-check-menu="'+id+'"]').prop("checked",true);
        	$('[stack-check-view="'+id+'"]').prop("checked",true);
			$('[stack-check-add="'+id+'"]').prop("checked",true);
			$('[stack-check-edit="'+id+'"]').prop("checked",true);
			$('[stack-check-delete="'+id+'"]').prop("checked",true);
            console.log("All checkboxs are checked.");
        }
        else if($('[stack-check="'+id+'"]').is(":not(:checked)")){
        	// $('[stack-check-view="'+id+'"]').prop("checked",false);
			$('[stack-check-menu="'+id+'"]').prop("checked",false);
        	$('[stack-check-view="'+id+'"]').prop("checked",false);
			$('[stack-check-add="'+id+'"]').prop("checked",false);
			$('[stack-check-edit="'+id+'"]').prop("checked",false);
			$('[stack-check-delete="'+id+'"]').prop("checked",false);
            console.log("All checkboxs are not checked.");
        }
	}); // end of check all
	/* check menu*/
	$('body').on('click', '[stack-check-menu]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check-menu');
		if($('[stack-check-menu="'+id+'"]').is(":checked") && $('[stack-check-view="'+id+'"]').prop('checked') ==true && $('[stack-check-add="'+id+'"]').prop('checked') ==true && $('[stack-check-edit="'+id+'"]').prop('checked') ==true && $('[stack-check-delete="'+id+'"]').is(":checked") ){
        	$('[stack-check="'+id+'"]').prop("checked", true);
        	console.log('menu all checked');
        }
      	else if($('[stack-check-menu="'+id+'"]').is(":not(:checked)") ){
			$('[stack-check="'+id+'"]').prop("checked", false);
			$('[stack-check-menu="'+id+'"]').prop("checked", false);
			console.log('menu all not checked');
        }else{
        	$('[stack-check-menu="'+id+'"]').prop("checked", true);
        	console.log('menu checked');
        }
	}); // end of check menu
	/* check view*/
	$('body').on('click', '[stack-check-view]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check-view');
		if( $('[stack-check-menu="'+id+'"]').prop('checked') ==true && $('[stack-check-view="'+id+'"]').is(":checked") && $('[stack-check-add="'+id+'"]').prop('checked') ==true && $('[stack-check-edit="'+id+'"]').prop('checked') ==true && $('[stack-check-delete="'+id+'"]').is(":checked") ){
        	$('[stack-check="'+id+'"]').prop("checked", true);
        	console.log('view all checked');
        }
      	else if($('[stack-check-view="'+id+'"]').is(":not(:checked)") ){
			$('[stack-check="'+id+'"]').prop("checked", false);
			$('[stack-check-view="'+id+'"]').prop("checked", false);
			console.log('view all not checked');
        }else{
        	$('[stack-check-view="'+id+'"]').prop("checked", true);
        	console.log('view checked');
        }
	}); // end of check view

	/* check add*/
	$('body').on('click', '[stack-check-add]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check-add');
		if($('[stack-check-menu="'+id+'"]').prop('checked') ==true && $('[stack-check-view="'+id+'"]').prop('checked') ==true && $('[stack-check-add="'+id+'"]').is(":checked") && $('[stack-check-edit="'+id+'"]').prop('checked') ==true && $('[stack-check-delete="'+id+'"]').prop('checked') ==true){
        	$('[stack-check="'+id+'"]').prop("checked", true);
        	console.log('add all checked');
        }
      	else if($('[stack-check-add="'+id+'"]').is(":not(:checked)")){
			$('[stack-check="'+id+'"]').prop("checked", false);
			$('[stack-check-add="'+id+'"]').prop("checked", false);
			console.log('add all not checked');
        }else{
        	$('[stack-check-add="'+id+'"]').prop("checked", true);
        	console.log('add checked');
        }
	}); // end of check add
	/* check edit*/
	$('body').on('click', '[stack-check-edit]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check-edit');
		if($('[stack-check-menu="'+id+'"]').prop('checked') ==true && $('[stack-check-view="'+id+'"]').prop('checked') ==true && $('[stack-check-add="'+id+'"]').prop('checked') ==true && $('[stack-check-edit="'+id+'"]').is(":checked")  && $('[stack-check-delete="'+id+'"]').prop('checked') ==true){
        	$('[stack-check="'+id+'"]').prop("checked", true);
        	console.log('edit all checked');
        }
      	else if($('[stack-check-edit="'+id+'"]').is(":not(:checked)")){
			$('[stack-check="'+id+'"]').prop("checked", false);
			$('[stack-check-edit="'+id+'"]').prop("checked", false);
			console.log('edit all not checked');
        }else{
        	$('[stack-check-edit="'+id+'"]').prop("checked", true);
        	console.log('edit checked');
        }
	}); // end of check edit

		/* check delete*/
	$('body').on('click', '[stack-check-delete]', function(e){
		var $this = $(this);
		var id = $this.attr('stack-check-delete');
		if($('[stack-check-menu="'+id+'"]').prop('checked') ==true && $('[stack-check-view="'+id+'"]').prop('checked') ==true && $('[stack-check-add="'+id+'"]').prop('checked') ==true  && $('[stack-check-edit="'+id+'"]').prop('checked') ==true && $('[stack-check-delete="'+id+'"]').is(":checked") ){
        	$('[stack-check="'+id+'"]').prop("checked", true);
        	console.log('delete all checked');
        }
      	else if($('[stack-check-delete="'+id+'"]').is(":not(:checked)")){
			$('[stack-check="'+id+'"]').prop("checked", false);
			$('[stack-check-delete="'+id+'"]').prop("checked", false);
			console.log('delete all not checked');
        }else{
        	$('[stack-check-delete="'+id+'"]').prop("checked", true);
        	console.log('delete checked');
        }
	}); // end of check delete

}(window.JQuery);

$(document).ready(function() {
    $("#side-menu a").each(function() {
        if (this.href == window.location.href) {
            $(this).addClass("active");
            $(this).parent().addClass("active"); // add active to li of the current link
            $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
            $(this).parent().parent().prev().click(); // click the item to make it drop
        }
    });
});

$('body').on('click', '[stack-copy-clone]', function(){
	var htmlcl = $(this).attr('stack-copy-clone');
	var target = $(this).attr('target');
	
	var content = $(this).closest('table').find(htmlcl).clone();

	$(this).closest('table').find(target).append(content);
})

$('body').on('click', '[stack-tremove]', function(){
    $(this).closest('tr').remove();
	numberRows($('tbody#appendOi'));
})
$('body').on('click', '[stack-tdelt]', function(){
    $(this).closest('tr').remove();
})

function numberRows(t) {
    var c = 0;
    var i = 0;
      console.log(t);
    t.find("tr[main-row]").each(function(ind, el) {
      $(el).find("td:eq(0)").html(++c);
      $(el).find("#trtdddd td input").attr('name', 'bachelor['+(++i)+'][]');
    });
}

$('body').on('click', '[stack-clone]', function(){
    
	var target = $(this).attr('stack-clone');
	var lastId = $(this).closest('table').find('[last-id]').attr('last-id');
	var counter = 0;
	
	var addRow = '';
	addRow +='<tr main-row>'
    addRow +='    <td>'+counter+'</td>'
    addRow +='    <td colspan="2">'
    addRow +='        <div class="ibox-content p-0 border-0">'
    addRow +='            <div class="form-inline mb-3">'
    addRow +='                <div class="form-group" style="width:80%">'
    addRow +='                    <input type="text" name="major[]" class="form-control w-100" value="" placeholder="Type your option">'
    addRow +='                </div>'
    addRow +='                <button type="button" class="btn btn-sm btn-danger" style="margin: auto 0 auto auto;" stack-tremove><i class="fa fa-minus-circle"></i> Remove</button>'
    addRow +='            </div>'
    addRow +='            <table class="table table-bordered" stack-sortable="true">'
    addRow +='                <thead>'
    addRow +='                    <tr>'
    addRow +='                        <th width="50">No.</th>'
    addRow +='                        <th>Value</th>'
    addRow +='                        <th width="100"><button type="button" class="btn btn-xs btn-primary" stack-copy-clone="#trtdddd" target=".appendone"><i class="fa fa-plus-circle"></i> Add</button></th>'
    addRow +='                    </tr>'
    addRow +='                </thead>'
    addRow +='                <tbody class="appendone">'
    addRow +='                    <tr id="trtdddd">'
    addRow +='                        <td></td>'
    addRow +='                        <td><input type="text" name="bachelor[][]" class="form-control" placeholder="Type your option"></td>'
    addRow +='                        <td><button type="button" class="btn btn-xs btn-danger" stack-tdelt><i class="fa fa-minus-circle"></i> Remove</button></td>'
    addRow +='                    </tr>'
    addRow +='                </tbody>'
    addRow +='            </table>'
    addRow +='        </div>'
    addRow +='    </td>'
    addRow +='</tr>'

	$(target).append(addRow);
	
	numberRows($(target));
	
});

function numberRowsReport(t) {
    var c = 0;
    var i = 0;
      console.log(t);
    t.find("tr[main-row]").each(function(ind, el) {
      $(el).find("td:eq(0)").html(++c);
      $(el).find("#trtdddd td input").attr('name', 'reportFile['+(i++)+'][]');
    });
}

$('body').on('click', '[stack-clone-report]', function(){
    
	var target = $(this).attr('stack-clone-report');
	var lastId = $(this).closest('table').find('[last-id]').attr('last-id');
	var counter = 0;
	var addRow = '';
	addRow +='<tr main-row>'
  addRow +='  <td>'+counter+'</td>'
 	addRow +='    <td colspan="3">'
  addRow +='        <div class="ibox-content p-0 mb-3 border-0">'
  addRow +='            <div class="form-inline mb-3">'
  addRow +='                <div class="form-group" style="width:80%">'
  addRow +='                    <input type="text" name="reportTitle[]" class="form-control w-100" value="" placeholder="မှတ်ချက်ရေးရန်">'
  addRow +='                </div>'
  addRow +='                <button type="button" class="btn btn-sm btn-danger" style="margin: auto 0 auto auto;" stack-tremove><i class="fa fa-minus-circle"></i> Remove</button>'
  addRow +='            </div>'
  addRow +='        </div>'
  addRow +='     		<table class="table">'
  addRow +='         	<tbody class="appendone">'
  addRow +='            <tr id="trtdddd">'
  addRow +='							<td>'
  addRow +=' 								<div class="ibox-content p-0 border-0">'
  addRow +='     							<div class="form-inline">'
  addRow +='         						<div class="form-group" style="width:80%">'
  addRow +='             					<input type="file" name="reportFile[][]" class="form-control border-0 w-100" placeholder="မှတ်တမ်းပုံများ တင်ပြရန်" accept="image/png, image/jpeg, image/jpg, application/pdf, .dwg" multiple >'
  addRow +='         						</div>'
  addRow +='     							</div>'
  addRow +=' 								</div>'
  addRow +='							</td>'
  addRow +='             </tr>'
  addRow +='         	</tbody>'
  addRow +='     		</table>'
  addRow +='    </td>'
  addRow +='</tr>'

	$(target).append(addRow);
	
	numberRowsReport($(target));
	
});

$('body').on('click', '[stack-search]', function(){
	var token = $('[stack-token]').val();
	var name = $('[stack-name]').val();
	var region = $('select[name="region"]').val();
	var district = $('select[name="district"]').val();
	var township = $('select[name="township"]').val();
	// console.log(region+' - '+district+' - '+township);
	var $this = $(this);
	var pUrl = $this.attr('stack-search');
	var oUrl = pUrl.replace('page-', '');
	var regexp = new RegExp('-', 'g');
    var lUrl = oUrl.replace(regexp, '/');
	var rURL = baseURL(lUrl);
	if (rURL) {
		$.ajax({
			type: 'post',
		    url: rURL,
		    data:{token:token, name:name, region:region, district:district, township:township,},
		    dataType: "json",
		    beforeSend: function(){

		    },
		    success: function(results){
		    	$('#stack-data-set').html(results);
		    }
		});
	}
});
$(document).ready(function(){
	$('#back').click(function(){
		parent.history.back();
		return false;
	});
});


/*vrc here*/
var totalAmount = localStorage.getItem('countDown') || 0,
    timeloop;

if (totalAmount) {
    timeSet()
}


function timeSet (rURL) {
    totalAmount--;
    
     if (totalAmount < 0 ) {
     	vrcode_upate();
        localStorage.removeItem('countDown');
        totalAmount = 0;
        clearTimeout(timeloop);
        $('.alert').removeClass('show');        
        $('[stack-vrcode]').removeAttr("style");
        // $('[stack-vrcode]').text('Try again');

         return;
     }

    // var minutes = parseInt(totalAmount/60);
    // var seconds = parseInt(totalAmount%60);
    var seconds = parseInt(totalAmount);

    if(seconds < 10)
        seconds = "0"+seconds;

    $('#tminus').val(seconds+'s');

    timeloop = setTimeout(timeSet, 1000);
}
function vrcode_upate(){
	var rurl = 'login/vercode';
	var stack_token = $("input[name=stack_token]").val();
	$.ajax({
		type: 'POST',
	    url: rurl,
	    data:{stack_token:stack_token},
	    dataType: "json",
	    beforeSend: function(){

	    },
	    success: function(results){
		    $('.alert').addClass('show');
		    $('#message').text(results.message);
		    console.log(results.stack_token);
		    $("input[name=stack_token]").val(results.stack_token);
	    }
	});
}
$('body').on('click', '[stack-vrcode]', function(){
   
    var $this = $(this);
	var pUrl = $this.attr('stack-vrcode');
	var oUrl = pUrl.replace('page-', '');
	var regexp = new RegExp('-', 'g');
    var lUrl = oUrl.replace(regexp, '/');
	var rURL = baseURL(lUrl);
	var stack_token = $("input[name=stack_token]").val();
	if (rURL) {
		$.ajax({
			type: 'POST',
		    url: rURL,
		    data:{stack_token:stack_token},
		    dataType: "json",
		    beforeSend: function(){

		    },
		    success: function(results){
		    	 console.log(results.stack_token);
		    	$("input[name=stack_token]").val(results.stack_token);
		    	$('[stack-vrcode]').hide();
			    $('.tminus_append').removeClass("tminus_append");
			    $("stack-tminus").show("slow");
			    $('.alert').addClass('show');
			    $('#message').text(results.message);
			    var reqVal = 1;//$('#request').val();
			    var parAmt = parseInt(reqVal);

				if (timeloop) {
			        clearTimeout(timeloop)
			    }
			    totalAmount = 60;//parAmt * 60; //120second or 2minute
			    
			    timeSet(rURL);
		    }
		});
	}
    
})
// Clear timeout and remove localStorage value when resetting form
$('#countdown').on('reset', function () {
    totalAmount = 0;
    clearTimeout(timeloop);
    localStorage.removeItem('countDown');
    
})
$('body').on('click', '[stack-vercode]', function (){
	// $(".tminus_append").hide();
	totalAmount = 0;
    clearTimeout(timeloop);
    localStorage.removeItem('countDown');
});

$(document).ready(function(){
	$("#goForm").each(function() {
	    $(this).find('#goSubmit').prop('disabled', true);
	  });
	var i = 2;
	for (var i = 0; i < i.length; i++) {
		
		$("#goForm"+i).each(function() {
	    $(this).find('#goSubmit'+i).prop('disabled', true);
	  });
}

});

function correctCaptcha() {
	$("#goForm").each(function() {
        $(this).find('#goSubmit').prop('disabled', false);
    });
	var i = 2;
	for (var i = 1; i < i.length; i++) {
		
		$("#goForm"+i).each(function() {
	    $(this).find('#goSubmit'+i).prop('disabled', true);
	  });
}
    // $("#goForm").each(function() {
    //     $(this).find('#goSubmit').prop('disabled', false);
    //     $(this).find('#goSubmit1').prop('disabled', false);
    // });
}
//