<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Essential School</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{asset('admin/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin/font-awesome/css/font-awesome.css')}}" rel="stylesheet">

    <link href="{{asset('admin/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('admin/css/style.css')}}" rel="stylesheet">

    <!-- Datatables -->
    <link href="{{asset('admin/css/plugins/dataTables/datatables.min.css')}}" rel="stylesheet">
    <!-- End Datatables -->

    <link href="{{asset('admin/css/plugins/datapicker/datepicker3.css')}}" rel="stylesheet">
   

</head>

<body>
 <?php 
        $active = 'active';
        $inactive = '';
        $cur_page = Request::segment(2);
        
    ?>
<div id="wrapper">

    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="block m-t-xs font-bold">{{ auth()->user()->name}}</span>
                           
                        </a>
                        
                    </div>
                    <div class="logo-element">
                                            
                    </div>
                </li>
              
                <li class="<?php echo ($cur_page == 'event')? $active:$inactive; ?> mt-5">
                    <a href="{{route('event.index')}}"><i class="fa fa-th-large"></i> <span class="nav-label">Event Lists</span> </a>
                </li>
                
            </ul>

        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                    <form role="search" class="navbar-form-custom" method="post" action="#">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                        </div>
                    </form>
                </div>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <ul class="nav navbar-top-links navbar-right">
                        <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                this.closest('form').submit();">
                             <i class="fa fa-sign-out"></i>Log out
                            </a> 
                        </li>
                    </ul>
                </form>
               

            </nav>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="m-t-lg">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="pull-right">
                
            </div>
            <div>
                <strong>Copyright</strong> Example Company &copy; <?php echo date("Y-m-d")?>
            </div>
        </div>

    </div>
</div>


<!-- Mainly scripts -->
<script src="{{asset('admin/js/jquery-3.1.1.min.js')}}"></script>
<script src="{{asset('admin/js/popper.min.js')}}"></script>
<script src="{{asset('admin/js/bootstrap.min.js')}}"></script>

<!-- Datatables js -->
<script src="{{asset('admin/js/plugins/dataTables/datatables.min.js')}}"></script>
<!-- End Datatables js -->

<!-- Data picker -->
<script src="{{asset('admin/js/plugins/datapicker/bootstrap-datepicker.js')}}"></script>
<script src="{{asset('admin/js/template.js')}}"></script>





<script type="text/javascript">
    $(document).ready(function () {
       var mem = $('#data_1 .input-group.date').datepicker({
                format: 'yyyy-mm-dd',
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });

        

    })
</script>

<script>
        // Upgrade button class name
        $.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-white btn-sm';
        var urlPath = window.location.pathname.split('/').pop(); 
        var dynamicTitle = urlPath.charAt(0).toUpperCase() + urlPath.slice(1);  
        $(document).ready(function(){
            $('.dataTables').DataTable({
                pageLength: 25,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    //{extend: 'excel', title: 'ExampleFile'},
                    {extend: 'excel', title: dynamicTitle},
                    //{extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'pdf', title: dynamicTitle},

                    {extend: 'print', title: dynamicTitle,
                     customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '12px');

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                    }
                    }
                ]

            });

        });

    </script>

</body>

</html>
