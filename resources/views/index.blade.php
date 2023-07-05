<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>2pointDelivery</title>

    <!-- Fonts -->
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('backoffice/fonts/fontawesome-free/css/all.min.css') }}">

    <link rel="shortcut icon" href="{{ asset('images/favicon.png') }}">
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    


    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('backoffice/css/adminlte.min.css') }}">

    {{-- <link rel="stylesheet" href="{{ asset('css/825e4518863dd04c.css') }}"> --}}
    {{-- <link rel="stylesheet" href="{{ asset('css/825e4518863dd04c.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('css/0254f7c1f346d767.css') }}">
    {{-- <link rel="stylesheet" href="{{ asset('css/9be2033fd17fdf2f.css') }}">
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
<body class="hold-transition font-sans font-nunito overflow-x-hidden bg-[#f4f6f9]">
    <div  id="page-top" class="bg-[#f4f6f9]">

    </div>

    {{-- @env ('local')
            <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
        @endenv --}}



    <!-- jQuery -->
    <script src="{{ asset('backoffice/js/jquery/jquery.min.js') }}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{ asset('backoffice/js/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

    <!-- BS custom file input  -->
    <script src="{{ asset('backoffice/js/bs-custom-file-input/bs-custom-file-input.min.js') }}"></script>
    <!-- AdminLTE App -->
    <script src="{{ asset('backoffice/js/adminlte.min.js') }}"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="{{ asset('backoffice/js/demo.js') }}"></script>
</body>
</html>
