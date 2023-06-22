<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.8">

    <title>2pointDelivery</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <link rel="shortcut icon" href="{{ asset('images/favicon.png') }}">
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    <!-- Custom styles for this page -->
    <link href="{{ asset("deps/datatables/dataTables.bootstrap4.min.css")}}" rel="stylesheet">


    <link rel="stylesheet" href="{{ asset("deps/sb-admin-2.css") }}">
    
    {{-- <link rel="stylesheet" href="{{ asset('css/825e4518863dd04c.css') }}"> --}}
    {{-- <link rel="stylesheet" href="{{ asset('css/825e4518863dd04c.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('css/0254f7c1f346d767.css') }}">
   {{--  <link rel="stylesheet" href="{{ asset('css/9be2033fd17fdf2f.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fe699058e63f5db4.css') }}">
    <link rel="stylesheet" href="{{ asset('css/f32964b10281b9b2.css') }}">
    <link rel="stylesheet" href="{{ asset('css/d325.style-ef83e7318dd10ce571bf.css') }}">
    <link rel="stylesheet" href="{{ asset('css/d41d8.style-01f1f8559dddac3d7ede.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style-4501a7264ba2cff67161.css') }}"> --}}

    <link rel="stylesheet" href="{{ asset("css/app.css") }}">



    <!-- Scripts -->
    @routes
    <script src="{{ asset(mix('js/app.js')) }}" defer></script>

    <script src="{{ asset('js/app.js') }}"></script>
</head>
<body class="font-sans antialiased">
    <div id="root"></div>

    {{-- @env ('local')
            <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
        @endenv --}}

    <!-- Bootstrap core JavaScript-->
    <script src="{{ asset("deps/jquery/jquery.min.js")}}"></script>
    <script src="{{ asset("deps/bootstrap/js/bootstrap.bundle.min.js")}}"></script>

    <!-- Core plugin JavaScript-->
    <script src="{{ asset("deps/jquery-easing/jquery.easing.min.js")}}"></script>

    <!-- Custom scripts for all pages-->
    <script src="{{ asset("deps/js/sb-admin-2.min.js")}}"></script>
</body>
</html>
